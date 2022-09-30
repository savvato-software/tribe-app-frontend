import { ProfilePage } from './profile.page';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditProfilePage} from "./edit/edit";


const routes: Routes = [
    {
        path: '',
        component: ProfilePage
    }
    ,{
        path: 'edit',
        component: EditProfilePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
