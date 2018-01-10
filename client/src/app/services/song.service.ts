import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
//Api 
import { GLOBALENDPOINT } from './global';
//Model 
import { Song } from '../models/song';

@Injectable()
export class SongService {

  public url: string;
  constructor(private _http: HttpClient) { 
    this.url = GLOBALENDPOINT.url;
  }

  getSongs(token, albumId = null){
		let headers = new HttpHeaders({
                              'Content-Type':'application/json',
                              'Authorization':token
                            });
		//let options = new RequestOptions({headers: headers});
    if(albumId == null){
			return this._http.get(`${this.url}songs`, {headers});
    }
    else{
			return this._http.get(`${this.url}songs/${albumId}`, {headers});	
		}
	}

	getSong(token, id: string){
		let headers = new HttpHeaders({
                                'Content-Type':'application/json',
                                'Authorization':token
                              });
		//let options = new RequestOptions({headers: headers});
		return this._http.get(`${this.url}song/${id}`, {headers});
	}

	addSong(token, song: Song){
		let params = JSON.stringify(song);
		let headers = new HttpHeaders({
                                'Content-Type':'application/json',
                                'Authorization':token
                              });
		return this._http.post(`${this.url}save-song/`, params, {headers});
	}

	editSong(token, id:string, song: Song){
		let params = JSON.stringify(song);
		let headers = new HttpHeaders({
                                  'Content-Type':'application/json',
                                  'Authorization':token
                                });
		return this._http.put(`${this.url}update-song/${id}`, params, {headers});
	}

	deleteSong(token, id: string){
		let headers = new HttpHeaders({
                                  'Content-Type':'application/json',
                                  'Authorization':token
                                });
		//let options = new RequestOptions({headers: headers});
		return this._http.delete(`${this.url}delete-song/${id}`, {headers});
	}

}
