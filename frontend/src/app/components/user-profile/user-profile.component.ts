import { Component, inject, OnInit } from '@angular/core';
import { UserServiceService } from '../../service/user-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
userService=inject(UserServiceService)
router=inject(Router)
userList:any
userId:string='';
ngOnInit(): void {
  const user=this.userService.getLoggedUser()
  this.userId=user.id
  this.getUser()
}

profileFormObj: FormGroup = new FormGroup({
  username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
  email: new FormControl('', Validators.required),
  mobile: new FormControl('', Validators.required),
  password: new FormControl('', [Validators.required, Validators.minLength(8)])
})
profileFormValue:any;

getUser(){
  this.userService.getUser().subscribe((res:any)=>{
    this.profileFormObj.patchValue({
      username: res.data.username,
      email: res.data.email,
      mobile: res.data.mobile,
      password: res.data.password
    })
  })
}

profileUpdate(){

  console.log('userId to update: ', this.userId);
  debugger
  this.profileFormValue = this.profileFormObj.value
  debugger
  this.userService.updateUser(this.userId, this.profileFormValue).subscribe((res: any) => {
   debugger
    console.log('update response: ', res);
    if (res.success) {
      alert('User updated')
      this.getUser()
    } else {
      alert(res.message)
    }
   
  })
  this.profileFormObj.reset()
 

}
cancelUpdate(){
  this.profileFormObj.reset()
  // this.router.navigateByUrl('user')

}

}
