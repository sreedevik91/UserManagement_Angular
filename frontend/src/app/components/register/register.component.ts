import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userService = inject(UserServiceService)
  router=inject(Router)

  registerFormObj: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
    email: new FormControl('', Validators.required),
    mobile: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  registerFormValue:any;

  registerUser() {
    debugger
    this.registerFormValue=this.registerFormObj.value
console.log('registeredUser: ',this.registerFormValue);

    this.userService.registerUser(this.registerFormValue).subscribe((data) => {
      console.log('success', data);
      alert('User account created')
      this.router.navigateByUrl('login')
    })
  }

  cancelRegistration(){
    this.registerFormObj.reset()
    this.router.navigateByUrl('login')
  }

}
