import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewAttributesPage } from './review-attributes.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewAttributesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewAttributesPageRoutingModule {}
