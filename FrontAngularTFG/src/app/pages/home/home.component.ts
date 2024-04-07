import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { createChart,CrosshairMode, ISeriesApi } from 'lightweight-charts';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ChartComponent} from "../../components/chart/chart.component";
import {MatIcon} from "@angular/material/icon";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    ChartComponent,
    MatIcon,
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ticker : string = '^IBEX';
  ticker2 : string = '^GSPC';
  ticker3 : string = '^DJI';
  ticker4 : string = '^STOXX50E';
  ticker5 : string = '^IXIC';
  ticker6 : string = '^N225';

  constructor(public login:LoginService) {
  }

}
