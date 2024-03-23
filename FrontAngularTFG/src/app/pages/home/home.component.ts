import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { createChart,CrosshairMode, ISeriesApi } from 'lightweight-charts';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ChartComponent} from "../../components/chart/chart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    ChartComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
  private chart: any;
  private candlestickSeries: any;

  ticker : string = '^IBEX';
  ticker2 : string = '^GSPC';
  ticker3 : string = '^DJI';
  ticker4 : string = '^STOXX50E';
  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.remove();
    }
  }

  createChart() {
    const container = document.getElementById('chart-container');

    if (!container) {
      return;
    }

    this.chart = createChart(container, {
      width: 600,
      height: 300,
      layout: {
        background: {color: 'black'},
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
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
      lineColor: '#2962FF',
      lineWidth: 2
    });
    this.candlestickSeries = this.chart.addAreaSeries();
    this.loadData();
  }

  loadData() {
    // Replace this with your own data or API call
    const data = [{ time: '2019-03-12', value: 180.91 },
      { time: '2019-03-13', value: 181.71 },
      { time: '2019-03-14', value: 183.73 },
      { time: '2019-03-15', value: 186.12 },
      { time: '2019-03-18', value: 188.02 },
      { time: '2019-03-19', value: 186.53 },
      { time: '2019-03-20', value: 188.16 },
      { time: '2019-03-21', value: 195.09 },
      { time: '2019-03-22', value: 191.05 },
      { time: '2019-03-25', value: 188.74 },
      { time: '2019-03-26', value: 186.79 },
      { time: '2019-03-27', value: 188.47 },
      { time: '2019-03-28', value: 188.72 },
      { time: '2019-03-29', value: 189.95 },
      { time: '2019-04-01', value: 191.24 },
      { time: '2019-04-02', value: 194.02 },
      { time: '2019-04-03', value: 195.35 },
      { time: '2019-04-04', value: 195.69 },
      { time: '2019-04-05', value: 197 },
      { time: '2019-04-08', value: 200.1 },
      { time: '2019-04-09', value: 199.5 },
      { time: '2019-04-10', value: 200.62 },
      { time: '2019-04-11', value: 198.95 },
      { time: '2019-04-12', value: 198.87 },
      { time: '2019-04-15', value: 199.23 },
      { time: '2019-04-16', value: 199.25 },
      { time: '2019-04-17', value: 203.13 },
      { time: '2019-04-18', value: 203.86 },
      { time: '2019-04-22', value: 204.53 },
      { time: '2019-04-23', value: 207.48 },
      { time: '2019-04-24', value: 207.16 },
      { time: '2019-04-25', value: 205.28 },
      { time: '2019-04-26', value: 204.3 },
      { time: '2019-04-29', value: 204.61 },
      { time: '2019-04-30', value: 200.67 },
      { time: '2019-05-01', value: 210.52 },
      { time: '2019-05-02', value: 209.15 },
      { time: '2019-05-03', value: 211.75 },
      { time: '2019-05-06', value: 208.48 },
      { time: '2019-05-07', value: 202.86 },
      { time: '2019-05-08', value: 202.9 },
      { time: '2019-05-09', value: 200.72 },
      { time: '2019-05-10', value: 197.18 },
      { time: '2019-05-13', value: 185.72 },
      { time: '2019-05-14', value: 188.66 },
      { time: '2019-05-15', value: 190.92 },
      { time: '2019-05-16', value: 190.08 },
      { time: '2019-05-17', value: 189 },
      { time: '2019-05-20', value: 183.09 },
      { time: '2019-05-21', value: 186.6 },
      { time: '2019-05-22', value: 182.78 },
      { time: '2019-05-23', value: 179.66 },
      { time: '2019-05-24', value: 178.97 },
      { time: '2019-05-28', value: 179.07 },];
    this.candlestickSeries.setData(data);

  }


}
