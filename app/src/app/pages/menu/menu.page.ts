import { Component, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/interfaces/order-item';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  orderSize: number = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    let initOrderSize: number = 0;
    this.orderService.getOrder().subscribe((orders: OrderItem[]) => {
      orders.forEach(order => initOrderSize += order.quantity);
      this.orderService.setOrderSize(initOrderSize);
      this.orderService.getOrderSize().subscribe((size: number) => {
        this.orderSize = size;
      });
    })
  }

}
