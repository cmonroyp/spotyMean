import { Component, OnInit } from '@angular/core';

//Service 
import { UserService } from './../../services/user.service';

//model 
import { User } from './../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  public titulo:string;
  public user:User;
  public identity;
  public token;
  public updategister;

  constructor(private _userService: UserService) {
   
    this.titulo = 'Actualizar mis Datos';
    //this.user = new User('','','','','','','');//inicializa las propiedades vacias
   }

  ngOnInit() {
    //Cargamos datos si existen en el localstorage del usuario autenticado.
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.user = this.identity;

  }

  onSubmit(){
    this._userService.updateUser(this.user)
        .subscribe((resp)=>{
          console.log(resp);
          //this.user = resp['user'];
          localStorage.setItem('identity',JSON.stringify(this.user));
          document.getElementById('identity_name').innerHTML = this.user.name;//modificamos la variable de bienvenida
          this.updategister = "Usuario Actualizado Correctamente!."

        },
        (err)=>{
          console.log(err);
          this.updategister = err.error.message;
        }
      )
  }

}
