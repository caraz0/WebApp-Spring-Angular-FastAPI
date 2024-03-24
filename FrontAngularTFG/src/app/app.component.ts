import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MatButton, MatButtonModule} from "@angular/material/button";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SignupComponent, HttpClientModule,
    MatSnackBarModule, MatCardModule, MatToolbarModule, MatIconModule,
  MatDialogModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
