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
import {TransactionsellComponent} from "../../components/transactionsell/transactionsell.component";

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
    ChartComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})

export class PortfolioComponent implements OnInit{

  transactions: any[] = [];
  displayedColumns: string[] = ['ticker', 'quantity', 'price', 'picker', 'delete', 'sell'];
  dataSource = new MatTableDataSource<any>;
  comparedDataList: Data[][] = [];
  dataSum: Record<string, number> = {};
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
          }
          this.dataSum = this.sumValuesForMatchingDates(...this.comparedDataList);
          console.log('Datos comparados sumados',  ':', this.dataSum);

          this.showChart = true;

          this.createChart();

        } else {
          console.error('Datos recibidos no son un array:', data);
      }
  }

  openTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionComponent, {
      width: '400px',
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

  openSellDialog(transaction: any): void {
    const dialogRef = this.dialog.open(TransactionsellComponent, {
      width: '400px',
      data: transaction,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.portfolioService.addPortfolioEntry(result).subscribe(_ => {
          this.loadPortfolioEntries();
          window.location.reload()
        });
      }
    });
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

}
