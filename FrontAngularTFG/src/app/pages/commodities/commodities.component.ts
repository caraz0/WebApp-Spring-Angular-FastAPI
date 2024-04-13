import { Component } from '@angular/core';
import {ChartComponent} from "../../components/chart/chart.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-commodities',
  standalone: true,
    imports: [
        ChartComponent,
        NgForOf
    ],
  templateUrl: './commodities.component.html',
  styleUrl: './commodities.component.css'
})
export class CommoditiesComponent {
  tickers: string[] = ['GC=F', 'SI=F', 'BZ=F', 'NG=F', 'PL=F', 'HG=F', 'PA=F', 'CC=F', 'ZC=F', 'CT=F', 'ZW=F', 'ZS=F', 'ZO=F', 'ZL=F'];

}
