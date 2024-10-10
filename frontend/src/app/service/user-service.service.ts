import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode'
// importing constant file containing the interface for the JwtPayload after jwtDecode
import { CustomJwtPayload, User } from '../constants/CustomJwtPayload';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectUsers } from '../store/app.selector';

@Injectable({
  providedIn: 'root'
})


export class UserServiceService {
  userList$:Observable<User[]>

  constructor(private store:Store<AppState>) { 
    this.loggedUser=this.getLoggedUser()
this.userList$=this.store.select(selectUsers)

  }


  // isLoginFail = signal<boolean>(false)
  // loggedUser = signal({})
  isLoginFail:boolean=false
  loggedUser:any
  isAdmin:boolean=false
  // isAdmin = signal<boolean>(false)

  http = inject(HttpClient)

  url = 'http://localhost:4000/'


  changeLoginStatus() {
    this.isLoginFail=true
  }

  getLoginStatus() {
    return this.isLoginFail
  }

  getLoggedUser() {
   return this.loggedUser
  }

  getIsAdmin() {
    return this.isAdmin
  }

  setIsAdmin() {
    this.isAdmin=true
  }

  setLoggedUser(token: string) {
    // return this.loggedUser()

    // addlogic to extract details from jwt token using npm jwt_decode

    const tokenData: CustomJwtPayload = jwtDecode(token)
    const { id, username,isAdmin } = tokenData
    const user={id, username,isAdmin }
    this.loggedUser=user
    return user

  }

  registerUser(userDetails: any) {
    // debugger;
    return this.http.post(`${this.url}addUser`, userDetails)
    // return this.http.post(`http://localhost:4000/addUser`,userDetails)
  }

  //   loginUser(username:string,password:string){
  // return this.http.get(`${this.url}users`)
  //   }
  login(userObj: any) {
    return this.http.post(`${this.url}login`, userObj)
  }


  getUser() {
    // console.log('userId:',id);
    // return this.http.get(`${this.url}profile/${id}`)
    return this.http.get<User>(`${this.url}profile`)
  }

  getUserById(id: string){
    return this.http.get<User>(`${this.url}userDetails/${id}`)
  }

  getAllUsers() {
    // return this.http.get<User[]>(`${this.url}users`)
    return this.http.get<User[]>(`${this.url}users`)
  }

  updateUser(id: string,data:any) {
    return this.http.post(`${this.url}updateProfile/${id}`,data)
  }

  deleteUser(id: string) {
    return this.http.delete<User>(`${this.url}deleteUser/${id}`)
 
  }

}
