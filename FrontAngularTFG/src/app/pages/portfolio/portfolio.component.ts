import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionComponent } from '../../components/transaction/transaction.component';
import { Data } from "./data";

import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton, MatIconAnchor, MatIconButton} from "@angular/material/button";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {DatePipe, NgIf} from "@angular/common";
import {DataService} from "../../services/data.service";
import {PortfolioService} from "../../services/portfolio.service";
import {MatIcon} from "@angular/material/icon";
import { createChart,CrosshairMode, ISeriesApi } from 'lightweight-charts';
import {ChartComponent} from "../../components/chart/chart.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatButton,
    MatCardTitle,
    MatCardSubtitle,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRowDef,
    MatHeaderCellDef,
    MatRowDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    DatePipe,
    MatIcon,
    MatIconAnchor,
    NgIf,
    MatIconButton,
    ChartComponent,
    MatTabGroup,
    MatTab,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})

export class PortfolioComponent implements OnInit{

  transactions: any[] = [];
  displayedColumns: string[] = ['ticker', 'operation' ,'quantity', 'price', 'picker','ChangeValue','PercentChange' ,'delete'];
  dataSource = new MatTableDataSource<any>;
  comparedDataList: Data[][] = [];
  comparedDataList2: Data[][] = [];
  dataSum: Record<string, number> = {};
  dataSum2: Record<string, number> = {};
  dataSum3: Record<string, number> = {};

  private chart: any;
  showChart: boolean = false;

  constructor(public dialog: MatDialog, private dataService: DataService,
              private portfolioService: PortfolioService){
  }

  async ngOnInit()  {
     await this.loadPortfolioEntries();

    }

  async loadPortfolioEntries() {
    const data = await this.portfolioService.getPortfolioEntries().toPromise()
        if (Array.isArray(data)) {
          this.transactions = data.map(entry => ({
            id: entry.id,
            symbol: entry.symbol,
            amount: entry.amount,
            price: entry.price,
            date: entry.date,
            operationAction: entry.operationAction
          }));
          this.dataSource.data = this.transactions;
          for (const entry of  this.transactions) {
            await this.dataService.getComparedData(entry.symbol, entry.price, entry.amount, entry.date, entry.operationAction)
              .toPromise()
              .then(data => {

                if (data) {
                  const comparedData = data as Data[];
                  this.comparedDataList.push(comparedData);

                } else {
                  console.error('Datos no disponibles para', entry.symbol);
                }
              })
              .catch(error => {
                console.error('Error al obtener datos del servicio para', entry.symbol, ':', error);
              });
            await this.dataService.getPortfolio(entry.symbol, entry.price, entry.amount, entry.date, entry.operationAction)
              .toPromise()
              .then(data => {
                if (data) {
                  const comparedData2 = data as Data[];
                  this.comparedDataList2.push(comparedData2);
                } else {
                  console.error('Datos no disponibles para', entry.symbol);
                }
              })
              .catch(error => {
                console.error('Error al obtener datos del servicio para', entry.symbol, ':', error);
              });
          }
          this.dataSum = this.sumValuesForMatchingDates(...this.comparedDataList);
          this.dataSum2 = this.sumValuesForMatchingDates(...this.comparedDataList2);
          this.dataSum3 = this.sumValuesForMatchingDates(...this.comparedDataList, ...this.comparedDataList2);
          this.showChart = true;

          for (const entry of this.transactions.filter(entry => entry.operationAction === 'BUY')) {
            const buyIndex = this.transactions.indexOf(entry);
            const comparedData = this.comparedDataList[buyIndex];

            const initialValue = comparedData[0].value;
            const finalValue = comparedData[comparedData.length - 1].value;


            entry.dollarValue = (finalValue - initialValue).toFixed(2);
            entry.percentChange = (((finalValue - initialValue) / initialValue) * 100).toFixed(2) + '%';
          }

          this.createChart();
          this.createChart2();
          this.createChart3();

        } else {
          console.error('Datos recibidos no son un array:', data);
      }
  }

  openTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionComponent, {
      width: '400px',
      data: {
        transactions: this.transactions
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.portfolioService.addPortfolioEntry(result).subscribe(_ => {
          this.loadPortfolioEntries()
          window.location.reload()
        });
      }
    });
  }
  deleteTransaction(transaction: any): void {
    const index = this.transactions.indexOf(transaction);
    if (index >= 0) {

      this.transactions.splice(transaction.id, 1);
      this.dataSource.data = this.transactions;

      this.portfolioService.deletePortfolioEntry(transaction.id).subscribe(
        () => {
          this.loadPortfolioEntries();
          window.location.reload()
          console.log('Entrada eliminada exitosamente');
        },
        (error) => {
          console.error('Error al eliminar la entrada:', error);

          this.loadPortfolioEntries();
        }
      );
    } else {
      console.error('Entrada no encontrada en la lista');
    }
  }

  sumValuesForMatchingDates(...dataArray: Data[][]): Record<string, number> {
    const result: Record<string, number> = {};

    for (const data of dataArray) {
      const mapData = new Map(data.map(entry => [entry.time, entry.value]));

      for (const [time, value] of mapData) {
        if (result[time]) {
          result[time] += value;
        } else {
          result[time] = value;
        }
      }
    }
    return result;
  }


  createChart() {
    const container = document.getElementById("chart-container");
    if (!container) {
      return;
    }
    this.chart = createChart(container, {
      width: 500,
      height: 250,
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

    const dataArray = [];

    for (const [time, value] of Object.entries(this.dataSum)) {
      dataArray.push({ time, value });
    }
    dataArray.sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
    series.setData(dataArray);

  }

  createChart2() {
    const container = document.getElementById("chart-container2");
    if (!container) {
      return;
    }
    this.chart = createChart(container, {
      width: 500,
      height: 250,
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

    const dataArray = [];

    for (const [time, value] of Object.entries(this.dataSum2)) {
      dataArray.push({ time, value });
    }
    dataArray.sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
    series.setData(dataArray);

  }

  createChart3() {
    const container = document.getElementById("chart-container3");
    if (!container) {
      return;
    }
    this.chart = createChart(container, {
      width: 500,
      height: 250,
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

    const dataArray = [];

    for (const [time, value] of Object.entries(this.dataSum3)) {
      dataArray.push({ time, value });
    }
    dataArray.sort((a, b) => {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
    series.setData(dataArray);

  }

}
