import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import { createChart,CrosshairMode, ISeriesApi } from 'lightweight-charts';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-charttemplate',
  standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle
    ],
  templateUrl: './charttemplate.component.html',
  styleUrl: './charttemplate.component.css'
})
export class CharttemplateComponent implements OnInit{
  private chart: any;
  protected ticker2: string = '';

  tickerName: string = '';
  lastValue: number = 0;
  currency: string = '';



  @Input() ticker: string = '';
  stockData: Object | undefined = [];
  constructor(private stockService: DataService) { }
  async ngOnInit() {
    await this.loadStockData();
    this.createChart();

  }
  async loadStockData() {
    this.stockData = await this.stockService.getMacroData(this.ticker).toPromise()
    this.ticker2 = this.ticker.replace('^', '');

  }

  createChart() {

    const container = document.getElementById("chart-container" + this.ticker);

    if (!container) {
      return;
    }

    this.chart = createChart(container, {
      width: 700,
      height: 350,
      layout: {
        background: {color: '#140F1C'},
        textColor: 'white',
      },
      leftPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        visible: true,
        borderVisible: false,
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: false,
      },
      grid: {
        horzLines: {
          color: '#eee',
        },
        vertLines: {
          color: '#ffffff',
        },
      },
    });
    const series = this.chart.addAreaSeries({
      topColor: '#7CA12B',
      bottomColor: 'rgb(159, 197, 88, 0.01)',
      lineColor: '#7CA12B',
      lineWidth: 2
    });
    //this.candlestickSeries = this.chart.addAreaSeries();
    series.setData(this.stockData);

  }

}
