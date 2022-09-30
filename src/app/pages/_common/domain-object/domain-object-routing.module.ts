import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomainObjectPage } from './domain-object.page';

const routes: Routes = [
  {
    path: '',
    component: DomainObjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomainObjectPageRoutingModule {}
