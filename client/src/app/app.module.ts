import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';//hacer databindings
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

//Services
import { UserService } from './services/user.service';
import { ArtistService } from './services/artist.service';
import { UploadService } from './services/upload.service';

//iconos
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//rutas 
import { APP_ROUTING } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    APP_ROUTING
  ],
  providers: [UserService,ArtistService,UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
