import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';//hacer databindings
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

//Services
import { UserService } from './services/user.service';
import { UserEditComponent } from './components/user-edit/user-edit.component';

//iconos
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//rutas 
import { APP_ROUTING } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    APP_ROUTING
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
