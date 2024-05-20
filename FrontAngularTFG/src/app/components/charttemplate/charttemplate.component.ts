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
    if (this.ticker === 'IPCESP') {
      this.tickerName = 'CPI SPAIN';
    } else if (this.ticker === 'GDPESP') {
      this.tickerName = 'GDP SPAIN';
    } else if (this.ticker === 'GDPGER') {
      this.tickerName = 'GDP GERMANY';
    } else if (this.ticker === 'CPIGER') {
      this.tickerName = 'CPI GERMANY';
    } else if (this.ticker === 'GDP') {
      this.tickerName = 'GDP USA';
    } else if (this.ticker === 'CPIAUCNS') {
      this.tickerName = 'CPI USA';
    } else if (this.ticker === 'UNRATE') {
      this.tickerName = 'UNEMPLOYMENT RATE USA';
    } else if (this.ticker === 'FEDFUNDS') {
      this.tickerName = 'FED FUNDS RATE USA';
    } else if (this.ticker === 'FPCPITOTLZGUSA') {
      this.tickerName = 'INFLATION USA';
    } else if (this.ticker === 'HSN1F') {
      this.tickerName = 'HOUSING STARTS USA';
    } else if (this.ticker === 'INDPRO') {
      this.tickerName = 'INDUSTRIAL PRODUCTION USA';
    } else if (this.ticker === 'PAYEMS') {
      this.tickerName = 'PAYROLL EMPLOYMENT USA';
    } else if (this.ticker === 'PCE') {
      this.tickerName = 'PERSONAL CONSUMPTION EXPENDITURES USA';
    } else if (this.ticker === 'PCEPI') {
      this.tickerName = 'PCE PRICE INDEX USA';
    }
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
        background: {color: '#1A1526'},
        textColor: 'white',
      },
      leftPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        mode: 1,
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
      topColor: '#3B8FD9',
      bottomColor: 'rgb(59, 143, 217, 0.01)',
      lineColor: '#3B8FD9',
      lineWidth: 1
    });
    //this.candlestickSeries = this.chart.addAreaSeries();
    series.setData(this.stockData);

  }

}
