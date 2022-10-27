import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SunpagePage } from './sunpage.page';

const routes: Routes = [
  {
    path: '',
    component: SunpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SunpagePageRoutingModule {}
