import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import { createChart,CrosshairMode, ISeriesApi } from 'lightweight-charts';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit{
  private chart: any;
  private candlestickSeries: any;
  protected ticker2: string = '';

  tickerName: string = '';
  lastValue: number = 0;
  currency: string = '';

  stockData: Object | undefined = [];

  @Input() ticker: string = '';
  constructor(private stockService: DataService) { }
  async ngOnInit() {
    await this.loadStockData();
    this.createChart();
    this.getStockName();
    this.getLastValue();
  }
  getStockName() {
    this.stockService.getStockName(this.ticker).subscribe((data: any) => {
      this.tickerName = data;
    });
  }
  getLastValue() {
    this.stockService.getStockLastValue(this.ticker).subscribe((data: any) => {
      this.lastValue = data.last_value;
      this.currency = data.currency;
    });
  }
  async loadStockData() {
    this.stockData = await this.stockService.getStockData(this.ticker).toPromise()
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
          visible: false,
        },
        vertLines: {
          visible: false,
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
