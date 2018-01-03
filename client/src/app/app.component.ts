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
  public user_register : User;
  public identity;//idintifica los datos del usuario logueado.
  public getToken;//es el que se pasa al servicio.
  public errorMessage;
  public saludoUser;
  public alertRegister;

  constructor(private _userService: UserService){
    this.inicializarVariables();
  }


  ngOnInit(){
    //si el usuario ya fue logueado simplemente se recoge la informacion del mismo.
    this.identity = this._userService.getIdentity();
    this.getToken = this._userService.getToken();
    this.saludoUser = this.identity.name;

    console.log(this.identity);
    console.log(this.getToken);
  }

  onSubmit(){
    //conseguimos el usuario logueado
    //console.log('usuario inicio:' , this.user)
    this._userService.signUp(this.user).subscribe(
      resp =>{
        this.errorMessage = "";//limpiamos la variable en caso que exista alguna alerta anteriormente.
       // console.log(resp);
        //let identity = resp;
        this.identity = resp;
        //console.log('respuesta:',this.identity);
        if(!this.identity.user._id){
         alert('El usuario no se ha logueado correctamente!.')
        }
        else{
          //crear elemento en el localstorage para tener usuario en sesion.
          localStorage.setItem('identity',JSON.stringify(this.identity.user));

          this.saludoUser = this.identity.user.name;

          //conseguir token para enviarselo a cada peticion http.
          this._userService.signUp(this.user,true).subscribe(
            resp =>{
              this.getToken = resp;
              if(this.getToken.length <=0){
                alert('El token no se ha generado correctamente!.')
              }
              else{
                //crear elemento en el localstorage para tener token disponible.
                localStorage.setItem('token',this.getToken.token);

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

  onSubmitRegister(){
    
    this._userService.registerUser(this.user_register)  
        .subscribe((resp)=>{
          
          this.user_register = resp['user'];
          console.log(this.user_register);
          if(!this.user_register._id){
            this.alertRegister ='Error al Registrarse'
          }
          else{
            this.alertRegister ='Autentiquese con :' + ' ' + this.user_register.email;
          }
        },
        (err)=>{
          console.log(err);
          this.alertRegister = err.error.message;
        }
      );
  }

  logout(){
    this._userService.removeToken();
    //con esto forzamos a redirigirse a la pantalla de logueo.    
    this.inicializarVariables();
  }

  inicializarVariables(){
    this.identity = null;
    this.getToken = null;
    this.user = new User('','','','','','','');//inicializa las propiedades vacias
    this.user_register = new User('','','','','','ROLE_USER','');//inicializa las propiedades vacias
  }

}
