import { Injectable } from '@angular/core';
import { Dish } from '../../interfaces/dish';
import { AwsService } from '../aws/aws.service';
import { GenericService } from '../generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class DishService extends GenericService<Dish> {
  constructor(awsService: AwsService) {
    super(awsService);
  }

  getAllDishes() {
    return this.getAll('dishes');
  }

  getDishById(id: number) {
    return this.getById('dishes', id);
  }

  addDish(dish: Dish) {
    return this.add('dishes', dish);
  }

  updateDish(id: number, dish: Dish) {
    return this.update('dishes', id, dish);
  }

  deleteDish(id: number) {
    return this.delete('dishes', id);
  }
}

