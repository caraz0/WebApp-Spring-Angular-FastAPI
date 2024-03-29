import {Component, ElementRef, ViewChild} from '@angular/core';
import {TypeaheadMatch, TypeaheadModule} from "ngx-bootstrap/typeahead";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {DataService} from "../../services/data.service";
import {ChartComponent} from "../../components/chart/chart.component";

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [
    FormsModule,
    TypeaheadModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    NgForOf,
    MatLabel,
    MatButton,
    ChartComponent,
    NgIf
  ],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  options: string[] = ['APPL', 'AMZN', 'MSFT'];
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  filteredOptions: string[];

  constructor() {
    this.filteredOptions = this.options.slice();
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

  showChart: boolean = false;
  getValue() {
    this.showChart = true;
  }
}
