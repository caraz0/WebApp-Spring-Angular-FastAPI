import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {UserRegistrationService} from "../../services/user-registration.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
    NgOptimizedImage
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
  constructor(private userService:UserRegistrationService, private snack:MatSnackBar, private toast:ToastrService) { }

  formSubmit(){
    if(this.user.username=='' || this.user.password=='' || this.user.email==''){
      this.snack.open('Fields cannot be empty', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }
    this.userService.doRegistration(this.user).subscribe(
      data=>{
        console.log(data);
        this.toast.success('Registration Successful', );
        //alert('Registration Successful');
        location.href = "/login";
      },
      error=>{
        console.log(error);
          this.snack.open('Something went wrong', 'Aceptar', {
          duration: 3000,

        });
      }
    )
  }
}
