import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionComponent } from '../../components/transaction/transaction.component';

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
  displayedColumns: string[] = ['ticker', 'quantity', 'price', 'date'];
  dataSource = new MatTableDataSource<any>;

  constructor(public dialog: MatDialog) {
  }
  openTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      let data;
      if (result) {
        console.log(result);
        this.transactions.push(result);
        console.log(this.transactions);
        this.dataSource.data = this.transactions;
      }
    });
  }

}
