import { Injectable } from '@angular/core';
//import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
//endpoint 
import { GLOBALENDPOINT } from './global';

@Injectable()
export class UserService {

  public identity;
  public token;
  public url: string;
  //public gethash = false;

  constructor(private _http:HttpClient) { 

    this.url = GLOBALENDPOINT.url;
  }

  signUp(user_to_login, gethash?){

    if(gethash){
      user_to_login.gethash = gethash;//si gethash no es vacio añadimos el objeto a user_to_login
    }

    let params = JSON.stringify(user_to_login);
    let headers = new HttpHeaders({'Content-Type':'application/json'});
    //let params = json;

    return this._http.post(`${this.url}login`,params, {headers});
              //  .subscribe(data =>{
              //    console.log(data);
              //  })

  }

  getIdentity(){

    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != 'undefined'){
      this.identity = identity;//asigna un valor si existe en el localstorage.
    }
    else{
      this.identity = null;
    }

    return this.identity;
  }

  registerUser(user_to_resgister){

    let params = JSON.stringify(user_to_resgister);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(`${this.url}register`,params,{headers});
  }

  updateUser(user_to_update){

    let params = JSON.stringify(user_to_update);
    //console.log('parametros en servicio:',user_to_update.name);
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.getToken()});
    
   return this._http.put(`${this.url}update-user/${user_to_update._id}`,params,{headers})
              
  }

  getToken(){

    let token = localStorage.getItem('token');
    if(token != 'undefined'){
      this.token = token;
    }
    else{
      this.token = null;
    }

    return this.token;
  }
 
  removeToken(){       

    //Sesion Usuario
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    //localStorage.clear()
    
  }
}
