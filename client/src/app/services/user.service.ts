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

  public url: string;

  constructor(private _http:HttpClient) { 

    this.url = GLOBALENDPOINT.url;
  }

  signUp(user_to_login, gethash = null){
    
    if(gethash != null){
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

 
}
