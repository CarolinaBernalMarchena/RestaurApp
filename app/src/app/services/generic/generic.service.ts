import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AwsService } from '../aws/aws.service';
import { environment } from 'src/environments/environment.prod';

//Data management service that provides CRUD operations for any type of data

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {  //T as a generic parameter

  private apiUrl: string; //Variable to store the API URL

  constructor(private awsService: AwsService) { 
    this.apiUrl = environment.apiUrl; 
  }

  //GET all items
  protected getAll(endpoint: string): Observable<T[]> {
    const url = `${this.apiUrl}/${endpoint}`; //Construct the full URL using the base URL and endpoint
    const params = this.createAuthParams(); //Create the authorization parameters
    return this.awsService.get(url, {params: params}) as Observable<T[]>; //Make the GET request and return an Observable of an array of T
  }

  //GET item by id
  protected getById(endpoint: string, id: number): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;
    const params = this.createAuthParams();
    return this.awsService.get(url, {params: params}) as Observable<T>; //Make the GET request and return an Observable of type T
  }

  //POST item
  protected add(endpoint: string, item: T): Observable<T> {
    const url = `${this.apiUrl}/${endpoint}`;
    const params = this.createAuthParams();
    return this.awsService.post(url, item, {params: params}) as Observable<T>; //Make the POST request and return an Observable of the added item
  }

  //PUT item
  protected update(endpoint: string, id: number, item: T): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;
    const params = this.createAuthParams();
    return this.awsService.put(url, item, {params: params}); //Make the PUT request and return an Observable of the response
  }

  //DELETE item
  protected delete(endpoint: string, id: number): Observable<void> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;
    const params = this.createAuthParams();
    return this.awsService.delete(url, {params: params}) as Observable<void>; //Make the DELETE request and return an Observable of type void
  }

  //Obtain the token from the local storage
  protected getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  
  //Authorization headers
  protected createAuthParams(): HttpParams {
    const token = this.getToken();
    let params = new HttpParams();
    if (token) {
      params = params.set('Authorization', `Bearer ${token}`); //If a token exists, add it to the authorization parameters
    }
    return params;
  }

}

