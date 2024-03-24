import { Component } from '@angular/core';
import {ChartComponent} from "../../components/chart/chart.component";

@Component({
  selector: 'app-commodities',
  standalone: true,
  imports: [
    ChartComponent
  ],
  templateUrl: './commodities.component.html',
  styleUrl: './commodities.component.css'
})
export class CommoditiesComponent {
  ticker : string = 'GC=F';
  ticker2 : string = 'SI=F';
  ticker3 : string = 'BZ=F';
  ticker4 : string = 'NG=F';
  ticker5 : string = 'PL=F';
  ticker6 : string = 'HG=F';
  ticker7 : string = 'PA=F';
  ticker8 : string = 'CC=F';
  ticker9 : string = 'ZC=F';
  ticker10 : string = 'CT=F';
}
