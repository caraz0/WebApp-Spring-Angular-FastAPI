import { Injectable } from '@angular/core';
import baseUrl from "./url_helper";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  public getToken(){
    return localStorage.getItem('jwt');
  }

  public addPortfolioEntry(portfolioEntry:any){
    return this.http.post(`${baseUrl}/portfolio/addPortfolioEntry`, portfolioEntry, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })});
  }
  public getPortfolioEntries(){
    return this.http.get(`${baseUrl}/portfolio/getAll`,{headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })});
  }

  public deletePortfolioEntry(id:any){
    return this.http.delete(`${baseUrl}/portfolio/deletePortfolioEntry/${id}`,{headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })});
  }
}
