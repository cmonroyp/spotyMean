import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';

const app_routes: Routes = [
  //{ path: '',   pathMatch: 'full', redirectTo: '/home'},
  { path: '', component: HomeComponent },
  //{ path: 'home', component: HomeComponent },
  { path: 'artistas/:page', component: ArtistListComponent},
  { path: 'editar-artista/:id', component: ArtistEditComponent},
  { path: 'artista/:id', component: ArtistDetailComponent},
  { path: 'crear-artista', component: ArtistAddComponent},
  { path: 'mis-datos', component: UserEditComponent },
  { path: '**', component: HomeComponent },
  //{ path: '**', pathMatch: 'full', redirectTo: '/home' }
];

// @NgModule({
//   imports: [RouterModule.forChild(app_routes)],
//   exports: [RouterModule],
// })
//export class AppRoutingModule { }
export const APP_ROUTING = RouterModule.forRoot(app_routes);
//export const routedComponents = [NameComponent];