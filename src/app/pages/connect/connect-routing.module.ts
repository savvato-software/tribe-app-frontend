import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectPage } from './connect.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectPage
  },
  {
    path: 'open-connection',
    loadChildren: () => import('./open-connection/open-connection.module').then( m => m.OpenConnectionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectPageRoutingModule {}
