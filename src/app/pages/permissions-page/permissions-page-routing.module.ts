import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionsPagePage } from './permissions-page.page';

const routes: Routes = [
  {
    path: '',
    component: PermissionsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionsPagePageRoutingModule {}
