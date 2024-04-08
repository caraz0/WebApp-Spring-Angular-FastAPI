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

  getStockName(ticker: string) {
    return this.http.get(`http://localhost:8000/get_stock_name/?ticker=${ticker}`);
  }

  getStockLastValue(ticker: string) {
    return this.http.get(`http://localhost:8000/get_stock_lastvalue/?ticker=${ticker}`);
  }
  sendData(data: any) {
    return this.http.post<any>('http://localhost:8000/tracker_stock_data', data);
  }

  getMacroData(ticker: string) {
    return this.http.get(`http://localhost:8000/get_macro_data/?ticker=${ticker}`);
  }

  getComparedData(ticker: string, price: number, amount: number, date: string, operationAction: string) {
    return this.http.get(`http://localhost:8000/get_compared_data/?ticker=${ticker}&price=${price}&amount=${amount}&purchase_date=${date}&operationAction=${operationAction}`);
  }
  getPortfolio(ticker: string, price: number, amount: number, date: string, operationAction: string) {
    return this.http.get(`http://localhost:8000/get_portfolio/?ticker=${ticker}&price=${price}&amount=${amount}&purchase_date=${date}&operationAction=${operationAction}`);
  }
  getPriceChange(ticker: string,purchase_price: number) {
    return this.http.get(`http://localhost:8000/get_price_change/?symbol=${ticker}&purchase_price=${purchase_price}`);
  }
}
