import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectPage } from './connect.page';
import { ListConnectionsPage } from './list-connections/list-connections.page';
import { OpenConnectionPage } from './open-connection/open-connection.page';

const routes: Routes = [
  {
    path: 'Connect',
    component: ConnectPage
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./open-connection/open-connection.module').then( m => m.OpenConnectionPageModule)
  // },
  {
    path: 'List-Connections',
    component: ListConnectionsPage
  },
  {
    path: 'Open-connection',
    component: OpenConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectPageRoutingModule {}
