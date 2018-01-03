import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserEditComponent } from './components/user-edit/user-edit.component';

const app_routes: Routes = [
 
  { path: '', component: UserEditComponent },
  { path: 'mis-datos', component: UserEditComponent },
  { path: '**', component: UserEditComponent },
  //{ path: '**', pathMatch: 'full', redirectTo: 'home' }
];

// @NgModule({
//   imports: [RouterModule.forChild(app_routes)],
//   exports: [RouterModule],
// })
//export class AppRoutingModule { }
export const APP_ROUTING = RouterModule.forRoot(app_routes);
//export const routedComponents = [NameComponent];