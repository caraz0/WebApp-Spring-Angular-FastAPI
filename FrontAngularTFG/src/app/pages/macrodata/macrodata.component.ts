import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ChartComponent} from "../../components/chart/chart.component";
import {CharttemplateComponent} from "../../components/charttemplate/charttemplate.component";

@Component({
  selector: 'app-macrodata',
  standalone: true,
  imports: [
    ChartComponent,
    CharttemplateComponent
  ],
  templateUrl: './macrodata.component.html',
  styleUrl: './macrodata.component.css'
})
export class MacrodataComponent {

  ticker : string = 'IPCESP';
  ticker2 : string = '^GSPC';



}
