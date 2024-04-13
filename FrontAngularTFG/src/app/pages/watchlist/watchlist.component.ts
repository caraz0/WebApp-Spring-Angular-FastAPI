import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TypeaheadMatch, TypeaheadModule} from "ngx-bootstrap/typeahead";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DataService} from "../../services/data.service";
import {ChartComponent} from "../../components/chart/chart.component";
import {WatchlistService} from "../../services/watchlist.service";
import {MatIcon} from "@angular/material/icon";
import {symbolsWithIndex} from "../compare/symbols";
import {MatSelect} from "@angular/material/select";
import {ToastrService} from "ngx-toastr";

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
    NgIf,
    MatIcon,
    MatIconButton,
    MatSelect
  ],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit{
  options: string[] = ['AAPL', 'AMZN', 'MSFT'];
  myControl = new FormControl('');
  filteredOptions: string[];
  inputValues: string[] = [];
  constructor(private watchlistService: WatchlistService, private toast:ToastrService) {
    this.filteredOptions = this.options.slice();
  }

  showChart: boolean = false;
  getValue() {
    const inputValue = this.myControl.value;

    if (inputValue && !this.inputValues.includes(inputValue)) {
      this.watchlistService.addWatchlistEntry(inputValue).subscribe(_ => {
        this.inputValues.push(inputValue);
        this.loadWatchlist();
        this.showChart = true;
      });
    }else{
        this.toast.error('The symbol is already in the watchlist');

      }



  }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist() {
    this.watchlistService.getWatchlistEntries().subscribe((data: any) => {
      this.inputValues = data.map((entry: { symbol: any; }) => entry.symbol);
      console.log(data);
      console.log(this.inputValues);
      if (this.inputValues.length > 0) {
        this.showChart = true;
      }
    });
  }

  deleteEntry(symbol: string) {
    this.watchlistService.deleteWatchListEntry(symbol).subscribe(_ => {
      const index = this.inputValues.indexOf(symbol);
      if (index !== -1) {
        this.inputValues.splice(index, 1);
        this.showChart = this.inputValues.length > 0;
      } else {
        console.error('El elemento no se encuentra en la lista');
      }
    });
  }

  protected readonly symbols = symbolsWithIndex;
}
