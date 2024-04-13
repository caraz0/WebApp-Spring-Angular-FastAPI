import { Component } from '@angular/core';
import {ChartComponent} from "../../components/chart/chart.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    ChartComponent,
    NgForOf
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {

  tickers: string[] = ['AMZN', 'AAPL', 'NFLX', 'BABA', 'NVDA', 'MSFT', 'TEF.MC', 'SAN.MC', 'BBVA.MC', 'ITX.MC', 'GOOG',  'TSLA', 'META'];

}
