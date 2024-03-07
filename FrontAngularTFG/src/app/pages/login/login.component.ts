import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard} from "@angular/material/card";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatCard

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm = {
    "username" : '',
    "password" : ''
  }
  constructor(private snack:MatSnackBar, private loginService:LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm.username == '' || this.loginForm.password == ''){
      this.snack.open("Please fill all the fields", "Close", {
        duration: 3000
      });
    }
    this.loginService.generateToken(this.loginForm).subscribe(
      (data:any)=>{
        console.log("Response: ", data);
        this.loginService.loginUser(data.jwt);
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            console.log("User: ", user);
            this.loginService.setUser(user);
            location.href = "/";
          },
          (error:any)=>{
            console.log("Error: ", error);
          }
        );
      },
      (error:any)=>{
        console.log("Error: ", error);
        this.snack.open("Invalid Details", "Close", {
          duration: 3000
        });
      }
    );
  }

}
