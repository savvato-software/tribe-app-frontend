import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectPage } from './connect.page';
import { ListConnectionsPage } from './list-connections/list-connections.page';
import { OpenConnectionPage } from './open-connection/open-connection.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectPage
  },
  {
    path: 'list-connections',
    component: ListConnectionsPage
  },
  {
    path: 'open-connection',
    component: OpenConnectionPage
  },
  {
    path: 'accept-new-connection',
    loadChildren: () => import('./accept-new-connection/accept-new-connection.module').then( m => m.AcceptNewConnectionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectPageRoutingModule {}
