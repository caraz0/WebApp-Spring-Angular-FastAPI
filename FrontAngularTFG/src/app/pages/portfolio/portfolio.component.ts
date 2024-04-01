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
import {MatButton, MatIconAnchor} from "@angular/material/button";
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
import {DatahelperService} from "../../services/datahelper.service";
import {WatchlistService} from "../../services/watchlist.service";
import {PortfolioService} from "../../services/portfolio.service";
import {MatIcon} from "@angular/material/icon";

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
    NgIf
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})

export class PortfolioComponent implements OnInit{

  transactions: any[] = [];
  displayedColumns: string[] = ['ticker', 'quantity', 'price', 'picker', 'delete'];
  dataSource = new MatTableDataSource<any>;
  comparedData: Data[] = [];
  comparedDataList: Data[][] = [];

  constructor(public dialog: MatDialog, private dataService: DataService,
              private portfolioService: PortfolioService, private dataHelper: DatahelperService){
  }

  ngOnInit(): void {
     this.loadPortfolioEntries();

    }

  loadPortfolioEntries() {
    this.portfolioService.getPortfolioEntries().subscribe(
      (data: any) => {
        console.log('Datos recibidos:', data);
        if (Array.isArray(data)) {
          this.transactions = data.map(entry => ({
            id: entry.id,
            symbol: entry.symbol,
            amount: entry.amount,
            price: entry.price,
            date: entry.date,
          }));
          this.dataSource.data = this.transactions;
          console.log('Portfolios:', this.transactions);
          console.log('Tipo de datos:', );
          this.transactions.forEach(entry => {
            this.dataService.getComparedData(entry.symbol, entry.price, entry.amount, entry.date)
              .toPromise()
              .then(data => {
                if (data) {
                  const comparedData = data as Data[];
                  this.comparedDataList.push(comparedData);
                  console.log('Datos comparados para', entry.symbol, ':', comparedData);
                } else {
                  console.error('Datos no disponibles para', entry.symbol);
                }
              })
              .catch(error => {
                console.error('Error al obtener datos del servicio para', entry.symbol, ':', error);
              });
          });
        } else {
          console.error('Datos recibidos no son un array:', data);
        }
      },
      (error: any) => {
        console.error('Error al cargar los Portfolios:', error);
      }
    );
  }

  openTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.portfolioService.addPortfolioEntry(result).subscribe(_ => {
          this.loadPortfolioEntries()
        });

        this.dataSource.data = this.transactions;
        const ticker = result.symbol;
        this.dataService.getComparedData(result.symbol, result.price, result.amount, result.date)
          .toPromise()
          .then(data => {
            if (data) {
              this.comparedData = data as Data[];

              this.comparedDataList.push(this.comparedData);
              console.log(this.comparedData);
              console.log(this.comparedDataList);
            } else {
              console.error('Datos no disponibles');
            }
          })
          .catch(error => {
            console.error('Error al obtener datos del servicio:', error);
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



}
