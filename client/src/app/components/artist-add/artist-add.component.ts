import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Api 
import { GLOBALENDPOINT } from './../../services/global';
//Service 
import { UserService } from './../../services/user.service';
import { ArtistService } from '../../services/artist.service';

//Model 
import { Artist } from '../../models/artist';


@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css']
})
export class ArtistAddComponent implements OnInit {

  public titulo: string;
  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public messageArtist:string;
  public errorArtist: string;
  // public error = 'alert-success'
  // public success = 'alert-danger'

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
              private _artistService: ArtistService) {

                this.titulo ='Crear nuevo artista'
                this.url = GLOBALENDPOINT.url;

    }

  ngOnInit() {
    //recolectamos lo que este en el localestorage
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.artist = new Artist('','','');

    console.log('identity artistAdd',this.identity)
  }

  onSubmit(){
    this._artistService.addArtist(this.token,this.artist)
        .subscribe((resp:any)=>{
          console.log(resp.artist);
          console.log(resp.status);
          if(resp.status == 200){

            this.messageArtist= 'Artista Creado Correctamente!.';
           // this._router.navigate(['/editar-artista'],resp.artista._id);
          }
          else{
            this.errorArtist = 'Error al Crear al Artista!.';
          }
        },
        (err)=>{
          console.log(err);
          this.errorArtist = 'Error al Crear al Artista!.';
        })
  }

}
