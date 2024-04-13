import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { createChart,CrosshairMode, ISeriesApi } from 'lightweight-charts';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DataService} from "../../services/data.service";
import {ChartComponent} from "../../components/chart/chart.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-index',
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
    NgForOf
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  tickers: string[] = ['^IBEX', '^GSPC', '^DJI', '^STOXX50E', '^IXIC', '^N225', '^FTSE', '^FCHI', '^HSI', '^GDAXI', '^BSESN'];
  constructor() { }

}
