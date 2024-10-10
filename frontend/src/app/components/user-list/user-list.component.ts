import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { UserServiceService } from '../../service/user-service.service';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../reusableComponents/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../constants/CustomJwtPayload';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectUsers } from '../../store/app.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [AsyncPipe, ButtonComponent, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  // user$!: Observable<User[]>;
  user$!: any;
  http = inject(HttpClient)
  userService = inject(UserServiceService)
  router = inject(Router)
  userId: string = ''
  isUpdateUserClicked: boolean = false
  isAddUserClicked: boolean = false

  constructor(private store: Store<AppState>) {
    // this.getAllUsers()
    // this.user$=this.store.select(selectUsers)

  }

  updateFormObj: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])

  })
  updateFormValue: any;

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: any) => {
      console.log('Users: ', res.data);
      this.user$ = res.data
      console.log('Users$: ', this.user$);

      // this.user$ =Array.isArray(res.data) ? res.data : []
    })
  }

  goToUserUpdate(id: string) {
    this.isUpdateUserClicked = true
    this.userId = id
    this.userService.getUserById(id).subscribe((res: any) => {
      console.log(res);
      this.updateFormObj.patchValue({
        username: res.data.username,
        email: res.data.email,
        mobile: res.data.mobile,
        password: res.data.password
      })
    })
  }

  deleteUser(id: string) {
    const confirmDelete = confirm('Are you sure to delete the user ?')
    if (confirmDelete) {
      this.userService.deleteUser(id).subscribe((res: any) => {
        if (res.success) {
          alert('User deleted')
        } else {
          alert(res.message)
        }
      })
    }
    this.getAllUsers()
  }

  updateUser() {
    
    console.log('userId to update: ', this.userId);
    this.updateFormValue = this.updateFormObj.value
    this.userService.updateUser(this.userId, this.updateFormValue).subscribe((res: any) => {
      console.log('update response: ', res);
      if (res.success) {
        alert('User updated')

      } else {
        alert(res.message)
      }

    })
    this.updateFormObj.reset()
    this.isUpdateUserClicked = false
    this.getAllUsers()
  }

  cancelUpdate() {
    this.updateFormObj.reset()
    this.isUpdateUserClicked = false
  }

  onAddNewUser() {
    // debugger
    this.isAddUserClicked = true
  }

  addNewUser() {
    // debugger
    this.updateFormValue = this.updateFormObj.value

    this.userService.registerUser(this.updateFormValue).subscribe((data) => {
      console.log('success', data);
      alert('User account created')
    })
    this.isAddUserClicked = false
    this.getAllUsers()
  }

  cancelAddUser() {
    this.updateFormObj.reset()
    this.isAddUserClicked = false
  }

}
