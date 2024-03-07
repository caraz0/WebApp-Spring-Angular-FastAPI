import { Injectable } from '@angular/core';
import baseUrl from "./url_helper";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http:HttpClient) { }

  public doRegistration(user:any){
    return this.http.post(`${baseUrl}/users/save`, user, {responseType: 'text' as 'json'});
  }
}
