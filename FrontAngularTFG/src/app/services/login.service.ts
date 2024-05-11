import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import baseUrl from "./url_helper";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  public generateToken(loginForm:any){
    return this.http.post(`${baseUrl}/authenticate`, loginForm );
  }

  public loginUser(token:any) {
    localStorage.setItem('jwt', token);
  }

  public isLoggedIn(){
    let token = localStorage.getItem('jwt');
    return !(token == undefined || token === '' || token == null);
  }

  public logOut(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('jwt');
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
      return null;
    }
  }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/currentUser`, {headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() })});

  }
}
