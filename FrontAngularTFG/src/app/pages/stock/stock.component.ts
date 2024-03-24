import { Component } from '@angular/core';
import {ChartComponent} from "../../components/chart/chart.component";

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    ChartComponent
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {

  ticker : string = 'AMZN';
  ticker2 : string = 'AAPL';
  ticker3 : string = 'NFLX';
  ticker4 : string = 'BABA';
  ticker5 : string = 'NVDA';
  ticker6 : string = 'MSFT';
  ticker7 : string = 'TEF.MC';
  ticker8 : string = 'SAN.MC';
  ticker9 : string = 'BBVA.MC';
  ticker10 : string = 'ITX.MC';
}
