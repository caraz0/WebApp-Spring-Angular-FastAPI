import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import baseUrl from "./url_helper";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { }

  getStockData(ticker: string) {
    return this.http.get(`http://localhost:8000/get_stock_data/?ticker=${ticker}`);
  }

}
