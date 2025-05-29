import { Injectable } from '@angular/core';
import { AwsService } from '../aws/aws.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';
import { HttpHeaders } from '@angular/common/http';
import { OrderItem } from 'src/app/interfaces/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderSizeSubject = new BehaviorSubject<number>(0);

  constructor(private awsService: AwsService, private tokenService: TokenService) { }

  public getOrder(): Observable<OrderItem[]> {
    return this.awsService.get(`${environment.apiUrl}/order`, {headers: new HttpHeaders().set("Authorization", this.tokenService.getTokenAuthorization()!)});
  }

  public getOrderSize() {
    return this.orderSizeSubject.asObservable();
  }

  public setOrderSize(orderSize: number) {
    this.orderSizeSubject.next(orderSize);
  }

  public increaseOrderSize() {
    this.orderSizeSubject.next(this.orderSizeSubject.value + 1);
  }

  public decreaseOrderSize() {
    this.orderSizeSubject.next(this.orderSizeSubject.value - 1);
  }

  public orderProduct(productId: number) {
    return this.awsService.put(`${environment.apiUrl}/order/add/${productId}`, null, {headers: new HttpHeaders().set("Authorization", this.tokenService.getTokenAuthorization()!)});
  }

  public removeOrderProduct(productId: number) {
    return this.awsService.put(`${environment.apiUrl}/order/remove/${productId}`, null, {headers: new HttpHeaders().set("Authorization", this.tokenService.getTokenAuthorization()!)});
  }
}
