import { Component } from '@angular/core';
import {ChartComponent} from "../../components/chart/chart.component";

@Component({
  selector: 'app-forex',
  standalone: true,
    imports: [
        ChartComponent
    ],
  templateUrl: './forex.component.html',
  styleUrl: './forex.component.css'
})
export class ForexComponent {

  ticker : string = 'EURUSD=X';
  ticker2 : string = 'EURGBP=X';
  ticker3 : string = 'GBPUSD=X';
  ticker4 : string = 'EURJPY=X';
  ticker5 : string = 'AUDUSD=X';
  ticker6 : string = 'EURCAD=X';
}
