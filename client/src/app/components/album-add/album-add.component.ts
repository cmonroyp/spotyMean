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
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css']
})
export class AlbumAddComponent implements OnInit {

  public titulo; string;
  public artists: Artist;
  public album : Album;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public is_edit;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
              private _artistService: ArtistService,
              private _albumService: AlbumService) {

      this.titulo = 'Crear nuevo Album'
      this.url = GLOBALENDPOINT.url;
      this.album = new Album('','',2017,'','');
   }

  ngOnInit() {
    console.log('Componente cargado desde album-add.component.');

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  onSubmit(){
    this._route.params.forEach((params:Params)=>{
      let artist_id = params['artist'];
      this.album.artist = artist_id;

      this._albumService.addAlbum(this.token,this.album)
          .subscribe((resp:any)=>{

            if(!resp.album){
              console.log('Error en el Servidor');
            }
            else{
              this.alertMessage = 'El album fue creado correctamente!.';
              this.album = resp.album;
            } 
          },
          (err)=>{
            console.log(err);
          });
    });
    
  }

}
