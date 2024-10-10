import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginFormObj: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  userService = inject(UserServiceService)
  // userList: any[] = []
  user: any;
  loginFormValue: any;
  router = inject(Router)
  // isAdmin:boolean=false
  // isLoginFail: boolean = false
  isLoginFail = this.userService.getLoginStatus()

  login() {
    // this.userService.loginUser(this.userObj.value.username,this.userObj.value.password)
    this.loginFormValue = this.loginFormObj.value

    this.userService.login(this.loginFormValue).subscribe((res: any) => {
      console.log(res);
      if (res.token) {
        const token = res.token
        // console.log('token recieved after login:', token);
        
        sessionStorage.setItem('jwtToken',token)
        // console.log(token);
        this.user = this.userService.setLoggedUser(token)
        console.log('token data: ', this.user.id, this.user.username);
        if (this.user.isAdmin) {
          // this.isAdmin=true
          this.userService.setIsAdmin()
          this.router.navigateByUrl('users')
        } else {
          this.router.navigateByUrl('dashboard')
        }
      } else {
        this.userService.changeLoginStatus()
      }


    })

    // this.userService.getAllUsers().subscribe((res: any) => {
    //   this.userList = res.data
    //   // debugger;
    //   // console.log(this.userList); // printing all users
    //   this.userList = this.userList.filter(e => {
    //     return e.username === this.loginFormValue.username && e.password === this.loginFormValue.password
    //   })

    //   console.log('userExist: ', this.userList); // printing the existing user

    //   if (this.userList.length > 0) {
    //     if(this.userList[0].isAdmin){
    //       // this.isAdmin=true
    //     this.userService.setIsAdmin()
    //     this.router.navigateByUrl('users')
    //     }else{
    //       this.userService.setLoggedUser(this.userList[0])
    //       console.log('user: ',this.userList[0]);

    //       this.router.navigateByUrl('user')
    //     }
    //   } else {
    //     this.userService.changeSignalValue()
    //     this.isLoginFail=this.userService.getLoginStatus()
    //   }
    // })
    this.loginFormObj.reset()

    // this.userList=[]
  }

}
