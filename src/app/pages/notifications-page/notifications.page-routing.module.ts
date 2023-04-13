import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationPage } from './notifications.page';

const routes: Routes = [
    {
        path: '',
        component: NotificationPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotificationPageRoutingModule {}
