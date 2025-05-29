import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { AuthService } from 'src/app/services/auth/auth.service'; // Importar AuthService

@Component({
  selector: 'app-owner-businesses',
  templateUrl: './owner-businesses.page.html',
  styleUrls: ['./owner-businesses.page.scss'],
})
export class OwnerBusinessesPage implements OnInit {
  ownerId: number | undefined; // Cambia el tipo a number
  restaurants: any[] | undefined; // Cambia el tipo a any[] o define un tipo específico

  constructor(private authService: AuthService, private restaurantService: RestaurantService) {
    // Decodifica el token para obtener el ID del dueño
    const token = this.authService.getToken(); // Obtiene el token
    const owner = token ? this.authService.decodeToken(token) : null; // Decodifica el token only if it is not null

    if (owner && owner.ownerId) {
      this.ownerId = Number(owner.ownerId); // Convierte a number
    } else {
      console.error("Owner ID not found in token");
    }
  }

  ngOnInit() {
    this.loadRestaurants(); // Carga los restaurantes al inicializar la página
  }

  loadRestaurants() {
    // Llama al servicio para obtener los restaurantes
    if (this.ownerId) {
      this.restaurantService.getOwnerRestaurants(this.ownerId).subscribe(
        (restaurants) => {
          this.restaurants = restaurants; // Asigna los restaurantes a la variable local
        },
        (error) => {
          console.error("Error loading restaurants", error);
        }
      );
    } else {
      console.error("Owner ID is not defined");
    }
  }
}
