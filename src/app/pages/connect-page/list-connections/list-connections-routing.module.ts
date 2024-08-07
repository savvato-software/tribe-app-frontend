import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListConnectionsPage } from './list-connections.page';
import { ConnectionDetailsPage } from '../connection-details/connection-details.page';

const routes: Routes = [
  {
    path: '',
    component: ListConnectionsPage
  },
  {
    path: 'connection-details',
    component: ConnectionDetailsPage
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListConnectionsPageRoutingModule {}
