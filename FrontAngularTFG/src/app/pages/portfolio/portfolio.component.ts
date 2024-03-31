import { Component } from '@angular/core';
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
import {MatButton} from "@angular/material/button";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import {DatePipe} from "@angular/common";
import {DataService} from "../../services/data.service";
import {DatahelperService} from "../../services/datahelper.service";

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
    DatePipe
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})

export class PortfolioComponent {

  transactions: any[] = [];
  displayedColumns: string[] = ['ticker', 'quantity', 'price', 'picker'];
  dataSource = new MatTableDataSource<any>;
  comparedData: Data[] = [];
  comparedDataList: Data[][] = [];

  constructor(public dialog: MatDialog, private dataService: DataService, private dataHelper: DatahelperService){
  }
  openTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.transactions.push(result);
        this.dataSource.data = this.transactions;
        const ticker = result.ticker;
        this.dataService.getComparedData(result.ticker, result.price, result.quantity, result.dateValue)
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




}
