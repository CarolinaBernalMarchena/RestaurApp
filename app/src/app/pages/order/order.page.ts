import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/interfaces/order-item';
import { OrderService } from 'src/app/services/order/order.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage {

  orderItems: OrderItem[] = [];
  totalPrice: number = 0;

  constructor(private sessionService: SessionService, private tokenService: TokenService, private orderService: OrderService, private router: Router) { }

  ionViewWillEnter() {
    this.sessionService.checkTokenValidity();
    this.orderService.getOrder().subscribe(orderItems => {
      this.orderItems = orderItems;
      this.calculateTotalPrice();
    });
  }

  cancelOrder() {
    this.sessionService.cancelOrder().subscribe(_ => {
      this.orderService.setOrderSize(0);
      this.tokenService.removeToken();
      this.router.navigateByUrl("/table");
    });
  }

  addItemOrder(orderItem: OrderItem) {
    this.orderService.orderProduct(orderItem.product.id).subscribe(_ => {
      const orderItemId = this.orderItems.indexOf(orderItem);
      this.orderItems[orderItemId].quantity++;
      this.orderService.increaseOrderSize();
      this.calculateTotalPrice();
    })
  }

  removeItemOrder(orderItem: OrderItem) {
    this.orderService.removeOrderProduct(orderItem.product.id).subscribe(_ => {
      const orderItemId = this.orderItems.indexOf(orderItem);
      orderItem.quantity--;
      if (orderItem.quantity == 0) this.orderItems.splice(orderItemId, 1);
      else this.orderItems[orderItemId] = orderItem;
      this.orderService.decreaseOrderSize();
      this.calculateTotalPrice();
    })
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.orderItems.forEach(orderItem => this.totalPrice += orderItem.product.price * orderItem.quantity);
  }

}
