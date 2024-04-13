import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import baseUrlData from "./url_helper_data";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { }

  getStockData(ticker: string) {
    return this.http.get(`${baseUrlData}/get_stock_data/?ticker=${ticker}`);
  }

  getStockName(ticker: string) {
    return this.http.get(`${baseUrlData}/get_stock_name/?ticker=${ticker}`);
  }

  getStockLastValue(ticker: string) {
    return this.http.get(`${baseUrlData}/get_stock_lastvalue/?ticker=${ticker}`);
  }
  sendData(data: any) {
    return this.http.post<any>('${baseUrlData}/tracker_stock_data', data);
  }

  getMacroData(ticker: string) {
    return this.http.get(`${baseUrlData}/get_macro_data/?ticker=${ticker}`);
  }

  getComparedData(ticker: string, price: number, amount: number, date: string, operationAction: string) {
    return this.http.get(`${baseUrlData}/get_compared_data/?ticker=${ticker}&price=${price}&amount=${amount}&purchase_date=${date}&operationAction=${operationAction}`);
  }
  getPortfolio(ticker: string, price: number, amount: number, date: string, operationAction: string) {
    return this.http.get(`${baseUrlData}/get_portfolio/?ticker=${ticker}&price=${price}&amount=${amount}&purchase_date=${date}&operationAction=${operationAction}`);
  }
  getPriceChange(ticker: string,purchase_price: number) {
    return this.http.get(`${baseUrlData}/get_price_change/?symbol=${ticker}&purchase_price=${purchase_price}`);
  }
  getCorrelation(requestBody: any) {
    return this.http.post(`${baseUrlData}/get_correlation/`, requestBody);
  }
}
