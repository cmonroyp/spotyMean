import { Component, OnInit } from '@angular/core';
import { User } from './models/user';

//Service 
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'MUSIFY';
  public user : User;
  public identity;//idintifica los datos del usuario logueado.
  public getToken;//es el que se pasa al servicio.
  public errorMessage;

  constructor(private _userService: UserService){
    this.user = new User('','','','','','ROLE_ADMIN','');//inicializa las propiedades vacias
  }


  ngOnInit(){
  }

  onSubmit(){
    //conseguimos el usuario logueado
    this._userService.signUp(this.user).subscribe(
      resp =>{
        this.errorMessage = "";//limpiamos la variable en caso que exista alguna alerta anteriormente.
       // console.log(resp);
        //let identity = resp;
        this.identity = resp;
        //console.log(this.identity.user);
        if(!this.identity.user._id){
         alert('El usuario no se ha logueado correctamente!.')
        }
        else{
          //crear elemento en el localstorage para tener usuario en sesion.

          //conseguir token para enviarselo a cada peticion http.
          this._userService.signUp(this.user,'true').subscribe(
            resp =>{

              this.getToken = resp;

              if(this.getToken.length <=0){
                alert('El token no se ha generado correctamente!.')
              }
              else{
                //crear elemento en el localstorage para tener token disponible.
                console.log(this.identity.user);
                console.log(this.getToken.token);
              }
      
          },
            err =>{
              console.log(err);
              this.errorMessage = err.error.message;
      
            });
        }
    },
      err =>{
        console.log(err);
        this.errorMessage = err.error.message;

      });
  }
}
