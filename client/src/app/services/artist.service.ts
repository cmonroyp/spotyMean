import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';

//endpoint 
import { GLOBALENDPOINT } from './global';
//model 
import { Artist } from '../models/artist';


@Injectable()
export class ArtistService {

  public url: string;
  constructor(private _http: HttpClient) {

    this.url = GLOBALENDPOINT.url;
   }

   
   getArtists(token, page){
     
     // const requestOptions ={
       //   paramas: new HttpParams()
       // }
       let headers = new HttpHeaders({'Content-Type':'application/json',
       'Authorization':token});
       
       //requestOptions.paramas.set({'headers': headers});
       return this._http.get(`${this.url}artists/${page}`,{headers});
       
      }
      
      getArtist(token, id:string){
        
        // const requestOptions ={
          //   paramas: new HttpParams()
          // }
          let headers = new HttpHeaders({'Content-Type':'application/json',
          'Authorization':token});
          
          //requestOptions.paramas.set({'headers': headers});
          return this._http.get(`${this.url}artistId/${id}`,{headers});          
        }
        
        addArtist(token, artist: Artist){
     
         let params = JSON.stringify(artist);
         let headers = new HttpHeaders({'Content-Type':'application/json',
                                        'Authorization':token});
     
         return this._http.post(`${this.url}save-artist/`,params,{headers});
        }

        editArtist(token, id: string,artist: Artist){
     
          let params = JSON.stringify(artist);
          let headers = new HttpHeaders({'Content-Type':'application/json',
                                         'Authorization':token});
      
          return this._http.put(`${this.url}update-artist/${id}`,params,{headers});                    
         }

         deleteArtist(token, id:string){
    
            let headers = new HttpHeaders({'Content-Type':'application/json',
            'Authorization':token});
 
            return this._http.delete(`${this.url}delete-artist/${id}`,{headers});
          }
}
