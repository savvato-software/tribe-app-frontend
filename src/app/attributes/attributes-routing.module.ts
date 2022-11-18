import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttributesPage } from './attributes.page';

const routes: Routes = [
  {
    path: '',
    component: AttributesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttributesPageRoutingModule {}
