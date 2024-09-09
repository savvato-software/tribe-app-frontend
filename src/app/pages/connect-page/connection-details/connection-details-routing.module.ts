import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionDetailsPage } from './connection-details.page';

const routes: Routes = [
    {
        path: '',
        component: ConnectionDetailsPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConnectionDetailsRoutingModule { }