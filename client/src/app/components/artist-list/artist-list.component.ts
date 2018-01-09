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
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  //providers:[UserService]
})
export class ArtistListComponent implements OnInit {

  public titulo: string;
  public artists: Artist[];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService,
              private _artistService: ArtistService) {

                this.titulo ='Artistas'
                this.url = GLOBALENDPOINT.url;
                this.next_page = 1;
                this.prev_page = 1;
    }

  ngOnInit() {
    //recolectamos lo que este en el localestorage
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log('identity artist',this.identity)
    //Conseguir el listado de artistas.
    this.getArtists();
  }

  getArtists(){
    this._route.params.forEach((params:Params)=>{
      let page = +params['page'];

      if(!page){
        page = 1;
      }
      else{
        this.next_page = page+1;
        this.prev_page = page-1;

        if(this.prev_page == 0){
          this.prev_page = 1;
        }
      }

      this._artistService.getArtists(this.token,page)
          .subscribe((resp:any)=>{
            if(!resp.artists){
              this._router.navigate(['/']);
            }
            else{
              this.artists = resp.artists;
            }
          },
          (err)=>{
            console.log(err);
          })
    });
  }

  public confirmado;
  onDeleteConfirm(id: string){
    this.confirmado = id;
  }

  onDeleteArtist(id: string){
    this._artistService.deleteArtist(this.token,id)
        .subscribe((resp:any)=>{
          if(!resp.artist){
            alert('Error en el Servidor.')
          }
          this.getArtists();
        },
        (err)=>{
          console.log(err);
        })
  }

  onCancelArtist(){
    this.confirmado = null;
  }

}
