import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
//Api 
import { GLOBALENDPOINT } from './global';
//Model 
import { Album } from '../models/album';


@Injectable()
export class AlbumService {

  public url;
  constructor(private _http: HttpClient) {
    
      this.url = GLOBALENDPOINT.url;
   }

  addAlbum(token,album:Album){

    let params = JSON.stringify(album);
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                    'Authorization':token});

    return this._http.post(`${this.url}save-album/`,params,{headers});
  }

  getAlbums(token, artistId = null){
		let headers = new HttpHeaders({
                                  'Content-Type':'application/json',
                                  'Authorization':token
		                        });
		//let options = new RequestOptions({headers:headers});
		if(artistId == null){
			return this._http.get(`${this.url}albums`, {headers});
    }
    else{
			return this._http.get(`${this.url}albums/${artistId}`, {headers});						
		}

	}

	getAlbum(token, id: string){
		let headers = new HttpHeaders({
                                  'Content-Type':'application/json',
                                  'Authorization':token
		                        });

		//let options = new RequestOptions({headers:headers});
		return this._http.get(`${this.url}album/${id}`, {headers});
  }
  
  editAlbum(token, id:string, album: Album){
		let params = JSON.stringify(album);
		let headers = new HttpHeaders({
                                  'Content-Type':'application/json',
                                  'Authorization':token
		                        });

		return this._http.put(`${this.url}update-album/${id}`, params, {headers});
	}

	deleteAlbum(token, id: string){
		let headers = new HttpHeaders({
                                  'Content-Type':'application/json',
                                  'Authorization':token
		                        });

		//let options = new RequestOptions({headers:headers});
		return this._http.delete(`${this.url}delete-album/${id}`, {headers});
  }
  
}
