import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectPage } from './connect.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectPageRoutingModule {}
