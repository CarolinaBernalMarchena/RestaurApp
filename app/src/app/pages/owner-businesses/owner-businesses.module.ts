import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OwnerBusinessesPageRoutingModule } from './owner-businesses-routing.module';
import { OwnerBusinessesPage } from './owner-businesses.page';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerBusinessesPageRoutingModule
  ],
  declarations: [OwnerBusinessesPage],
  providers: [RestaurantService] // Aunque no es necesario si tienes providedIn: 'root'
})
export class OwnerBusinessPageModule {}



