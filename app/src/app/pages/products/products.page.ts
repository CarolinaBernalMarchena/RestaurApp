import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectCustomEvent } from '@ionic/angular';
import { Allergen } from 'src/app/interfaces/allergen';
import { Dish, FoodType } from 'src/app/interfaces/dish';
import { AllergenService } from 'src/app/services/allergen/allergen.service';
import { DishService } from 'src/app/services/dish/dish.service';
import { OrderService } from 'src/app/services/order/order.service';
import { SessionService } from 'src/app/services/session/session.service';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  allDishes: Dish[] = [];
  filterDishes: Dish[] = [];

  allergens: Allergen[] = [];

  typeFilter: string = "all";
  allergenFilter: string[] = [];
  productOrder: string = "";

  constructor(private sessionService: SessionService, private orderService: OrderService, private tokenService: TokenService, private router: Router, private dishService: DishService, private allergenService: AllergenService) { }

  ngOnInit() {
    this.getDishes();
    this.getAllergens();
  }

  ionViewWillEnter() {
    this.sessionService.checkTokenValidity();
    this.applyFilters();
  }

  cancelOrder() {
    this.sessionService.cancelOrder().subscribe(_ => {
      this.orderService.setOrderSize(0);
      this.tokenService.removeToken();
      this.router.navigateByUrl("/table");
    });
  }

  getDishes(): void {
    this.dishService.getAllDishes().subscribe(dishes => {
      this.allDishes = dishes;
      this.filterDishes = this.allDishes;
    });
  }

  applyFilters(): void {
    this.filterDishes = this.allDishes;

    switch (this.typeFilter) {
      case "dishes":
        this.filterDishes = this.filterDishes.filter(dish => dish.foodType === FoodType.DISH);
        break;
      case "drinks":
        this.filterDishes = this.filterDishes.filter(dish => dish.foodType === FoodType.DRINK);
        break;
      default:
        break;
    }

    for(const allergen of this.allergenFilter) {
      this.filterDishes = this.filterDishes.filter(dish => dish.allergens.map(allergen => allergen.name.toLowerCase()).includes(allergen) == false);
    }

    this.orderProducts();
  }

  orderProducts(): void {
    switch (this.productOrder) {
      case "alphabet":
        this.filterDishes = this.filterDishes.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "reverseAlphabet":
        this.filterDishes = this.filterDishes.sort((a, b) => a.name.localeCompare(b.name)).reverse();
        break;
      case "type":
        this.filterDishes = this.filterDishes.sort((a, b) => a.foodType.localeCompare(b.foodType));
        break;
      case "price":
        this.filterDishes = this.filterDishes.sort((a, b) => a.price - b.price);
        break;
      case "reversePrice":
        this.filterDishes = this.filterDishes.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }

  getAllergens(): void {
    this.allergenService.getAllergens().subscribe(allergens => {
      this.allergens = allergens;
    })
  }

  filterProducts(event: SelectCustomEvent) {
    const filter: string = event.detail.value;
    this.typeFilter = filter;
    this.applyFilters();
  }

  filterAllergens(event: SelectCustomEvent) {
    const filters: string[] = event.detail.value;
    this.allergenFilter = filters;
    this.applyFilters();
  }

  setProductOrder(event: SelectCustomEvent) {
    const order: string = event.detail.value;
    this.productOrder = order;
    this.orderProducts();
  }

}
