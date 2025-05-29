import { Dish } from "./dish"

export interface OrderItem {
    id: number
    product: Dish
    quantity: number
}
