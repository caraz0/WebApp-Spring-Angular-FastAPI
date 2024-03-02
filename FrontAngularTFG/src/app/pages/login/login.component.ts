import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard} from "@angular/material/card";

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
export class LoginComponent {

}
