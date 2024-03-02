import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatIconAnchor} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    MatIconAnchor,
    MatIcon
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
