import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    MatLabel,
    FormsModule,


  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  constructor(public dialogRef: MatDialogRef<TransactionComponent>) {}

  saveTransaction(ticker: string, quantity: number, price: number, date: Date): void {
    const transaction = { ticker, quantity, price, date };
    this.dialogRef.close(transaction);
  }

  parseQuantity(value: string): number {
    return parseInt(value, 10);
  }

  parseDate(value: string): Date {
    return new Date(value);
  }

  protected readonly parseFloat = parseFloat;
}