import { Component } from '@angular/core';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {NativeDateAdapter, provideNativeDateAdapter} from "@angular/material/core";


@Component({
  selector: 'app-transaction',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    MatLabel,
    FormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

  constructor(public dialogRef: MatDialogRef<TransactionComponent>) {}

  saveTransaction(ticker: string, quantity: number, price: number, picker: MatDatepicker<Date>): void {

    const transaction = { ticker, quantity, price, picker};
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
