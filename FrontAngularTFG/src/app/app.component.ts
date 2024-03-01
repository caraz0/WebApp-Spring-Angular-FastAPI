import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatButton } from "@angular/material/button";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SignupComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TFG';
}
