import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
//Api 
import { GLOBALENDPOINT } from './../../services/global';
//Service 
import { UserService } from './../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { UploadService } from '../../services/upload.service';

//Model 
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-artist-edit',
  //templateUrl: './artist-edit.component.html',
  templateUrl: '../artist-add/artist-add.component.html',
  styleUrls: ['./artist-edit.component.css']
})
export class ArtistEditComponent implements OnInit {

  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public is_edit;
  public messageArtist: string;
  public errorArtist: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
              private _artistService: ArtistService,
              private _uploadService: UploadService) {

                this.titulo ='Crear nuevo artista'
                this.url = GLOBALENDPOINT.url;
                this.is_edit = true;
     }

  ngOnInit() {

    this.token = this._userService.getToken();
    //retorna un artista en base a su id.
    this.getArtist();
    
  }

  getArtist(){
    this._route.params.forEach((params: Params)=>{
        let id = params['id'];

        this._artistService.getArtist(this.token,id)
            .subscribe((resp:any)=>{
              this.artist = resp.artistId;
            },
            (err)=>{
              console.log(err);
            })
    })
  }

  onSubmit(){
		console.log(this.artist);
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

      this._artistService.editArtist(this.token, id, this.artist)
          .subscribe((resp:any) => {
					console.log('respuesta',resp)
					if(!resp.artistUpdate){
						this.errorArtist = 'Error en el servidor';
          }
          else{
						this.messageArtist = '¡El artista se ha actualizado correctamente!';
						if(!this.filesToUpload){
							this._router.navigate(['/artista', resp.artist._id ]);
            }
            else{
							//Subir la imagen del artista
							this._uploadService.makeFileRequest(this.url+'upload-image-artist/'+id, [], this.filesToUpload, this.token, 'image')
								.then(
									(result) => {
										this._router.navigate(['/artista', resp.artist._id]);
									},
									(error) => {
										console.log(error);
									}
								);
						}

					}

    },
				error => {
          console.log(error);
          this.errorArtist ='Error Actualizando el Artista.';
				});
		});
	}


  filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    
}
