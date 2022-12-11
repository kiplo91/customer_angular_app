import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiURL = "http://localhost:8000";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/customers/')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(customer:Customer): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/customer/register', JSON.stringify(customer), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/customer/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, customer:Customer): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/customer/' + id, JSON.stringify(customer), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/customer/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }



}
