import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Api 
import { GLOBALENDPOINT } from './../../services/global';
//Service 
import { UserService } from './../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';

//Model 
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';


@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  public artist: Artist;
	public albums: Album[];
	public identity;
	public token;
	public url: string;
  public alertMessage;
  
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
              private _artistService: ArtistService,
              private _albumService: AlbumService
            ) {
        
              this.url = GLOBALENDPOINT.url;
   }

  ngOnInit() {
    console.log('artist-edit.component.ts cargado');

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
    this.getArtist();
  }

  getArtist(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

      this._artistService.getArtist(this.token, id)
          .subscribe((response:any) => {
            console.log('metodo detail',response)
            if(!response.artistId){
              this._router.navigate(['/']);
            }
            else{
              this.artist = response.artistId;

						// Sacar los albums del artista
            this._albumService.getAlbums(this.token, response.artistId._id)
                .subscribe((response:any) => {
                  
                  if(!response.albums){
                    this.alertMessage = 'Este artista no tiene albums';
                  }
                  else{
                    this.albums = response.albums;
                  }
                },
                error => {
                  var errorMessage = <any>error;
                      if(errorMessage != null){
                        var body = JSON.parse(error._body);
                        console.log(error);
                      }
                });

					}
				},
				error => {
          var errorMessage = <any>error;
          if(errorMessage != null){
            var body = JSON.parse(error._body);
            console.log(error);
          }
			  });
		});
  }

    public confirmado;
    onDeleteConfirm(id){
      this.confirmado = id;
    }	

    onCancelAlbum(){
      this.confirmado = null;
    }

    onDeleteAlbum(id){
      this._albumService.deleteAlbum(this.token, id)
          .subscribe((response:any) => {
            if(!response.album){
              alert('Error en el servidor');
            }

          this.getArtist();
        },
        error => {
          var errorMessage = <any>error;

              if(errorMessage != null){
                var body = JSON.parse(error._body);
                //this.alertMessage = body.message;

                console.log(error);
              }
        }	
      );
    }
  
}
