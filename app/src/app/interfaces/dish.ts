import { Allergen } from "./allergen";

export interface Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    foodType: FoodType;
    allergens: Allergen[];
    image: string;
  }

  export enum FoodType {
    DISH = 'DISH',
    DRINK = 'DRINK'
  }
  