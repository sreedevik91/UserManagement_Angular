import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../reusableComponents/button/button.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { CustomJwtPayload, User } from '../../constants/CustomJwtPayload';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loadUsers } from '../../store/app.action';
import { Observable } from 'rxjs';
import { selectUsers } from '../../store/app.selector';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, RouterLink, RouterOutlet, JsonPipe, AsyncPipe, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  router = inject(Router)
  userService = inject(UserServiceService)
  isLoginFail!: boolean;
  loggedUser!: any;
  isAdmin!: boolean;
  user: string = ''
  // userList$!: Observable<User[]>
  userList$!: Observable<User[]>
  constructor(private store: Store<AppState>) {
    // this.loggedUser=this.userService.getLoggedUser()
    // console.log(this.loggedUser);
    // this.userProfile()
    
  }

  ngOnInit(): void {
    this.isLoginFail = this.userService.getLoginStatus()
    this.loggedUser = this.userService.getLoggedUser()
    this.isAdmin = this.userService.getIsAdmin()
    this.user=this.loggedUser.username
    // console.log('islLoginFail: ', this.isLoginFail, 'loggedUser: ', this.loggedUser, 'isAdmin: ', this.isAdmin);
    // this.store.dispatch(loadUsers())
    // this.userList$ = this.store.select(selectUsers)
    // console.log('users from store: ', this.userList$);

  }

  logout() {
    this.userService.loggedUser = {}
    sessionStorage.removeItem('jwtToken')
    this.router.navigateByUrl('login')

  }

  userProfile() {
    this.userService.getUser().subscribe((res: any) => {
      console.log('userById: ', res);
      this.loggedUser = res.data.username
      this.router.navigateByUrl('userProfile')
    })
    // this.router.navigateByUrl('userProfile')

  }
}
