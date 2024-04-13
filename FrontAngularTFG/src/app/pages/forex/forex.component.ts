import { Component } from '@angular/core';
import {ChartComponent} from "../../components/chart/chart.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [
    ChartComponent,
    NgForOf
  ],
  templateUrl: './forex.component.html',
  styleUrl: './forex.component.css'
})
export class ForexComponent {

  tickers: string[] = ['EURUSD=X', 'EURGBP=X', 'GBPUSD=X', 'EURJPY=X', 'AUDUSD=X', 'EURCAD=X', 'USDJPY=X', 'USDCAD=X', 'GBPJPY=X', 'AUDJPY=X'];

}
