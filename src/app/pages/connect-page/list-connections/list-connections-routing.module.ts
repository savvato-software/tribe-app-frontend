import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListConnectionsPage } from './list-connections.page';

const routes: Routes = [
  {
    path: '',
    component: ListConnectionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListConnectionsPageRoutingModule {}
