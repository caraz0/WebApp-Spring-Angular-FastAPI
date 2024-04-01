import { Component } from '@angular/core';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {
  MatDatepicker, MatDatepickerControl,
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

  saveTransaction(symbol: string, amount: number, price: number, picker: MatDatepicker<Date>): void {
    const date1: MatDatepickerControl<Date> = picker.datepickerInput;
    const startDate = date1.getStartValue();
    if (startDate) {
      const date = this.formatDate(startDate);
      console.log(symbol, amount, price, startDate.toDateString());
      const transaction = { symbol, amount, price, date};
      this.dialogRef.close(transaction);
    } else {
      console.error('No se pudo obtener la fecha de inicio.');
    }

  }

  parseQuantity(value: string): number {
    return parseInt(value, 10);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  protected readonly parseFloat = parseFloat;
}
