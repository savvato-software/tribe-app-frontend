import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth-guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'new-user',
    loadChildren: () => import('./new-user/new-user.module').then( m => m.NewUserPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    ,canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile-page/profile.page.module').then( m => m.ProfilePageModule)
    ,canActivate: [AuthGuard]
  },
  {
    path: 'attributes',
    loadChildren: () => import('./pages/attributes-page/attributes.page.module').then( m => m.AttributesPageModule)
    ,canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications-page/notifications.page.module').then( m => m.NotificationsPageModule)
    ,canActivate:[AuthGuard]
  },
  {
    path: 'permissions',
    loadChildren: () => import('./pages/permissions-page/permissions.page.module').then( m => m.PermissionsPageModule)
  },
  {
    path: 'connect',
    loadChildren: () => import('./pages/connect/connect.module').then( m => m.ConnectPageModule)
  },
  {
    path: 'list-connections',
    loadChildren: () => import('./pages/connect/list-connections/list-connections.module').then( m => m.ListConnectionsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
