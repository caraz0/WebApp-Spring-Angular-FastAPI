import { Injectable } from '@angular/core';
import baseUrl from "./url_helper";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private http:HttpClient) { }

  public getToken(){
    return localStorage.getItem('jwt');
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  public addWatchlistEntry(symbol: string) {
    return this.http.post<void>(`${baseUrl}/watchlist/add/${symbol}`, null, {headers: this.getHeaders()});
  }
  public getWatchlistEntries(){
    return this.http.get(`${baseUrl}/watchlist/getAll`, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })});
  }

  public deleteWatchListEntry(symbol:any){
    return this.http.delete(`${baseUrl}/watchlist/delete/${symbol}`, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })});
  }
}
