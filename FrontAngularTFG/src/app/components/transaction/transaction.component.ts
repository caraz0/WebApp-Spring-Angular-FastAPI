import {Component, ViewChild} from '@angular/core';
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDialogRef} from "@angular/material/dialog";
import {FormsModule, NgForm} from "@angular/forms";
import {
  MatDatepicker, MatDatepickerControl,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {NativeDateAdapter, provideNativeDateAdapter} from "@angular/material/core";

import {OperationAction} from "./OperationAction";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIcon} from "@angular/material/icon";
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
    MatFormFieldModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})

export class TransactionComponent {

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    const today = new Date();
    const selectedDay = (d || new Date()).getTime();
    const currentDay = today.getTime();

    return day !== 0 && day !== 6 && selectedDay <= currentDay;
  };
  constructor(public dialogRef: MatDialogRef<TransactionComponent>) {}

  saveTransaction(symbol: string, amount: number, price: number, picker: MatDatepicker<Date>): void {
    const date1: MatDatepickerControl<Date> = picker.datepickerInput;
    const startDate = date1.getStartValue();
    if (startDate) {
      const date = this.formatDate(startDate);
      console.log(symbol, amount, price, startDate.toDateString());
      const transaction = { symbol, amount, price, date, operationAction: this.selectedState};
      this.dialogRef.close(transaction);
    } else {
      console.error('No se pudo obtener la fecha de inicio.');
    }
  }

  selectedState = OperationAction.BUY;
  onChange($event: { value: OperationAction; }) {
    console.log($event.value);
    this.selectedState = $event.value;
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
  protected readonly OperationAction = OperationAction;
}
