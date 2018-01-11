import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Api 
import { GLOBALENDPOINT } from '../../services/global';
//Servicio
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { SongService } from '../../services/song.service';
//modelo
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-edit',
  templateUrl: '../song-add/song-add.component.html',
  //styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit {

  public titulo: string;
	public song: Song;
	public identity;
	public token;
	public url: string;
	public alertMessage;
  public is_edit;
  public artistName;
  public albumName;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
              private _uploadService: UploadService,
              private _songService: SongService) {
                
      this.titulo = 'Editar canción';               
      this.url = GLOBALENDPOINT.url;
      this.song = new Song(1,'', '', '', '');
      this.is_edit = true;

    }

  ngOnInit() {
    console.log('song-edit.component.ts cargado');

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    // Sacar la canción a editar
		this.getSong();
  }

  getSong(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

      this._songService.getSong(this.token, id)
          .subscribe((response:any) => {
            console.log('edit song',response);
                if(!response.song){
                  this._router.navigate(['/']);
                }
                else{
                  this.song = response.song;
                  //this.artistName = response.song.album.artist.name;
                  this.albumName = response.song.album.title;
                  console.log(this.song);
                }
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
		});
	}

	onSubmit(){

		this._route.params.forEach((params: Params) => {
			let id = params['id'];

      this._songService.editSong(this.token, id, this.song)
          .subscribe((response:any) => {
					
              if(!response.song){
                this.alertMessage = 'Error en el servidor';
              }
              else{
                this.alertMessage = '¡La canción se ha actualizamos correctamente!';
                
                if(!this.filesToUpload){
                  this._router.navigate(['/album', response.song.album]);
                }
                else{
                  // Subir el fichero de audio
                  this._uploadService.makeFileRequest(this.url+'upload-file-song/'+id, [], this.filesToUpload, this.token, 'file')
                    .then(
                      (result) => {
                        this._router.navigate(['/album', response.song.album]);
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
                }
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

		});

	}

	public filesToUpload;
	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}
