import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptNewConnectionPage } from './accept-new-connection.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptNewConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptNewConnectionPageRoutingModule {}
