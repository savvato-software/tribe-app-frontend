import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttributesPage } from './attributes.page';
import { EditAttributePage } from "./edit/edit";
import { DetailAttributePage } from "./detail/detail";
import { CreateAttributePage } from "./create/create";

const routes: Routes = [
  {
    path: '',
    component: AttributesPage
  }
  ,{
    path: 'detail',
    component: DetailAttributePage
  }
  ,{
    path: 'create',
    component: CreateAttributePage
  }
  ,{
    path: 'edit',
    component: EditAttributePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttributesPageRoutingModule {}
