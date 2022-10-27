import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth-guard";

const routes: Routes = [
	{
		path: 'profile',
		loadChildren: () => import('./pages/profile-page/profile.page.module').then( m => m.ProfilePageModule)
        ,canActivate: [AuthGuard]
	},
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
    path: 'domain-object',
    loadChildren: () => import('./pages/_common/domain-object/domain-object.module').then( m => m.DomainObjectPageModule)
  },
  {
    path: 'sunpage',
    loadChildren: () => import('./sunpage/sunpage.module').then( m => m.SunpagePageModule)
  },
  {
    path: 'attributes',
    loadChildren: () => import('./attributes/attributes.module').then( m => m.AttributesPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
