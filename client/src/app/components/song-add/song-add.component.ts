import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Api 
import { GLOBALENDPOINT } from '../../services/global';
//Servicios
import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song.service';
import { AlbumService } from '../../services/album.service';

//modelo
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css']
})
export class SongAddComponent implements OnInit {

  public titulo: string;
	public song: Song;
	public identity;
	public token;
	public url: string;
  public alertMessage;
  public artistName;
  public albumName;
  //public is_edit;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
              private _songService: SongService,
              private _albumService: AlbumService) { 

        //this.titulo = 'Agregar nueva canción';        
        this.url = GLOBALENDPOINT.url;
        this.song = new Song(1,'', '', '', '');
        //this.is_edit = true;
  }

  ngOnInit() {
    console.log('song-add.component.ts cargado');

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.showDataAlbum();
  }

  showDataAlbum(){

    this._route.params.forEach((params: Params) => {
			let album_id = params['album'];
      this.song.album = album_id;
      console.log(params)
      
    this._albumService.getAlbum(this.token,album_id)
        .subscribe((resp:any)=>{
          this.titulo ='Agregar nueva cancion';
          console.log(resp.album)
          this.artistName = resp.album.artist.name;
          this.albumName = resp.album.title;
         // console.log(resp.album.artist.name)
        })
      })
  }

  onSubmit(){

		this._route.params.forEach((params: Params) => {
			let album_id = params['album'];
			this.song.album = album_id;
      
      this._songService.addSong(this.token, this.song)
          .subscribe((response:any) => {
					
              if(!response.song){
                this.alertMessage = 'Error en el servidor';
              }else{
                this.alertMessage = '¡La canción se ha creado correctamente!';
                this.song = response.song;
                
                this._router.navigate(['/editar-tema', response.song._id]);
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

}
