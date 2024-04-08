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
  ticker1 : string = 'GDPESP';
  ticker2 : string = 'GDPGER';
  ticker3 : string = 'CPIGER';
  ticker4 : string = 'GDP';
  ticker5 : string = 'CPIAUCNS';
  ticker6 : string = 'UNRATE';
  ticker7 : string = 'FEDFUNDS';
  ticker8 : string = 'FPCPITOTLZGUSA';
  ticker9 : string = 'HSN1F';
  ticker10 : string = 'INDPRO';
  ticker11 : string = 'PAYEMS';
  ticker12 : string = 'PCE';
  ticker13 : string = 'PCEPI';
}
