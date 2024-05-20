import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {DataService} from "../../services/data.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {symbolsWithIndex} from "./symbols";
import {PortfolioChartComponent} from "../../components/portfolio-chart/portfolio-chart.component";
import {CompareChartComponent} from "../../components/compare-chart/compare-chart.component";
import { MatDialog } from '@angular/material/dialog';
import {MatAutocomplete, MatAutocompleteModule} from "@angular/material/autocomplete";

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatButton,
    NgIf,
    MatInput,
    MatInputModule,
    MatButtonModule,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatSelect,
    MatOption,
    MatAutocompleteModule,

  ],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css'
})
export class CompareComponent {
  myForm: FormGroup;
  stockData:any []= [];

  constructor(private fb: FormBuilder, private dataService: DataService, public dialog: MatDialog) {
    this.myForm = this.fb.group({
      inputs: this.fb.array([
        this.createInput(),
        this.createInput()])
    });
  }

  createInput(): FormGroup {
    return this.fb.group({
      valor: ['', Validators.required]
    });
  }

  get inputsArray(): FormArray {
    return this.myForm.get('inputs') as FormArray;
  }

  addInput(): void {
    if (this.inputsArray.length < 5) {
      this.inputsArray.push(this.createInput());
    }
  }

  removeInput(index: number): void {
    this.inputsArray.removeAt(index);
  }

  async processForm() {

    const dialogRef = this.dialog.open(CompareChartComponent, {
      width: '1000px',
      data: {
        symbols: this.myForm.value.inputs,
      }
    });

  }

  protected readonly symbols = symbolsWithIndex;
}
