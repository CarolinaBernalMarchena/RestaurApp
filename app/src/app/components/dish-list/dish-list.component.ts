import { Component, Input } from '@angular/core';
import { Dish } from '../../interfaces/dish';
import { IonicModule } from '@ionic/angular';
import { OrderService } from 'src/app/services/order/order.service';
import { FailImageDirective } from 'src/directives/fail-image.directive';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.scss'],
  standalone: true,
  imports: [IonicModule, FailImageDirective],
})
export class DishListComponent {
  @Input() dishes: Dish[] = []; 
  hoveredDish: number | null = null;

  constructor(private orderService: OrderService) {}

  orderProduct(productId: number): void {
    this.orderService.orderProduct(productId).subscribe(_ => {
      this.orderService.increaseOrderSize();
    })
  }

  onMouseEnter(dishId: number) {
    this.hoveredDish = dishId;
  }

  onMouseLeave() {
    this.hoveredDish = null;
  }
  
}
