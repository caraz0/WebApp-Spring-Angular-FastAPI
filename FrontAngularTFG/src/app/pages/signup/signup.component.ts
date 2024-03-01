import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {UserRegistrationService} from "../../services/user-registration.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatInputModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
   public user = {
    username: '',
    password: '',
    email: '',
   }
  constructor(private userService:UserRegistrationService) { }

  formSubmit(){
    if(this.user.username=='' || this.user.password=='' || this.user.email==''){
      alert('All fields are required');
      return;
    }
    this.userService.doRegistration(this.user).subscribe(
      data=>{
        console.log(data);
        alert('Registration Successful');
      },
      error=>{
        console.log(error);
        alert('Something went wrong');
      }
    )
  }
}
