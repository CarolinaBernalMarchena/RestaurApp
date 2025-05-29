import { Injectable } from '@angular/core';
import { AwsService } from '../aws/aws.service';
import { TokenService } from '../token/token.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private awsService: AwsService, private tokenService: TokenService, private router: Router) { }

  public getSession() {
    const sessionToken = this.tokenService.getToken();
    const httpHeaders = sessionToken? new HttpHeaders().set("Authorization", sessionToken) : undefined;

    return this.awsService.get(`${environment.apiUrl}/session`, {headers: httpHeaders});
  }

  public getAvailableTables() {
    return this.awsService.get(`${environment.apiUrl}/tables`);
  }

  public setSessionTable(id: string) {
    return this.awsService.put(`${environment.apiUrl}/table/${id}`, null, {headers: new HttpHeaders().set("Authorization", this.tokenService.getTokenAuthorization()!), observe: "response"});
  }

  public cancelOrder() {
    return this.awsService.put(`${environment.apiUrl}/cancel`, null, {headers: new HttpHeaders().set("Authorization", this.tokenService.getTokenAuthorization()!)});
  }

  public checkTokenValidity(): void {
    this.getSession().subscribe(
      {
        next: res => {
          if (res.table == null) this.router.navigateByUrl("/table");
        },
        error: _ => this.router.navigateByUrl("/table")
      }
    )
  }
}
