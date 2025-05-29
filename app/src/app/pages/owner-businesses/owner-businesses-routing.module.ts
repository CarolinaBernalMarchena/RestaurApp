import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerBusinessesPage } from './owner-businesses.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerBusinessesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerBusinessesPageRoutingModule {}
