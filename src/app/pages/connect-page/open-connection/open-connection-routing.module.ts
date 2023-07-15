import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpenConnectionPage } from './open-connection.page';

const routes: Routes = [
  {
    path: '',
    component: OpenConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenConnectionPageRoutingModule {}
