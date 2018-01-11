import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//Service 
import { UserService } from './../../services/user.service';
//model 
import { User } from './../../models/user';
//Url API 
import { GLOBALENDPOINT } from '../../services/global';


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
  public url: string;
  public alertMessage;
  public saludoUser;
  public mageUser;

  constructor(private _userService: UserService) {
   
    this.titulo = 'Actualizar mis Datos';
    this.url = GLOBALENDPOINT.url;
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
        .subscribe((response:any) => {
            if(!response.user){
              this.alertMessage = 'El usuario no se ha actualizado';
            }else{
              //this.user = response.user;
              localStorage.setItem('identity', JSON.stringify(this.user)); 
              //document.getElementById("identity_name").innerHTML = this.user.name;//modificamos la variable de bienvenida
 
              if(!this.filesToUpload){
                // Redireccion
              }else{
                this.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload).then(
                  (result: any) => {
                    //console.log('resultado image',result)
                    this.user.image = result.image;
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    let image_path = this.url+'get-image-user/'+this.user.image;
                    document.getElementById('image-logged').setAttribute('src', image_path);
                  }
                );
              }

					this.alertMessage = 'Datos actualizados correctamente';	
				}
			},
	        error => {
	            var errorMessage = <any>error;

	            if(errorMessage != null){
	              var body = JSON.parse(error._body);
	              this.alertMessage = body.message;

	              console.log(error);
	            }
	        }	
		);
	}
  // onSubmit(){
  //   this._userService.updateUser(this.user)
  //       .subscribe((resp)=>{
  //         console.log(resp);
  //         //this.user = resp['user'];
  //         localStorage.setItem('identity',JSON.stringify(this.user));
  //         document.getElementById('identity_name').innerHTML = this.user.name;//modificamos la variable de bienvenida

  //         //Valida si existe algun fichero para subir al servidor.
  //         if(!this.filesToUpload){
  //           //redireccion.
  //         }
  //         else{
  //           this.makeFileRequest(this.url + 'upload-image-user/'+ this.user._id, [], this.filesToUpload)
  //               .then((result:any)=>{
  //                 this.user.image = result.image;//esta respuesta la envia el metodo de la api image,user
  //                 localStorage.setItem('identity',JSON.stringify(this.user));
                  
  //                 //actualiza la imagen en el controlador principal app.component.html
  //                 let image_path = this.url + 'get-image-user/' + this.user.image;
  //                 document.getElementById('image-logged').setAttribute('src',image_path);
                
  //               })
  //         }

  //         this.updategister = "Usuario Actualizado Correctamente!."

  //       },
  //       (err)=>{
  //         console.log(err);
  //         this.updategister = err.error.message;
  //       }
  //     )
  // }

  //Metodo para preparar el archivo que se va a cargar.
  public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		var token = this.token;

		return new Promise(function(resolve, reject){
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append('image', files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
					
				}
			}

			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
		});

	}

}
