import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsService {

  constructor(private httpClient: HttpClient) { }

  public get(endpoint: string, options?: {params?: HttpParams, headers?: HttpHeaders, observe?: any}): Observable<any> { // Observe should only use "response"
    return this.httpClient.get(endpoint, {params: options?.params, headers: options?.headers, observe: options?.observe});
  }

  public post(endpoint: string, body?: any | null, options?: {params?: HttpParams, headers?: HttpHeaders, observe?: any}): Observable<any> {
    return this.httpClient.post(endpoint, body, {params: options?.params, headers: options?.headers, observe: options?.observe});
  }

  public put(endpoint: string, body: any | null, options?: {params?: HttpParams, headers?: HttpHeaders, observe?: any}): Observable<any> {
    return this.httpClient.put(endpoint, body, {params: options?.params, headers: options?.headers, observe: options?.observe});
  }

  public delete(endpoint: string, options? : {params?: HttpParams, headers?: HttpHeaders, observe?: any}): Observable<any> {
    return this.httpClient.delete(endpoint, {params: options?.params, headers: options?.headers, observe: options?.observe});
  }
}
