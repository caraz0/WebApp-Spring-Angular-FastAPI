import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import baseUrl from "./url_helper";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //Gen Token
  public generateToken(loginForm:any){
    return this.http.post(`${baseUrl}/authenticate`, loginForm );
  }

  //Login and set token in local storage
  public loginUser(token:any) {
    localStorage.setItem('jwt', token);
  }

  public isLoggedIn(){
    let token = localStorage.getItem('jwt');
    if(token == undefined || token === '' || token == null){
      return false;
    }else{
      return true;
    }
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
