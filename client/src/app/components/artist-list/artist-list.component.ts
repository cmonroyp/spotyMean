import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//Api 
import { GLOBALENDPOINT } from './../../services/global';
//Service 
import { UserService } from './../../services/user.service';
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
  public artist: Artist[];
  public identity;
  public token;
  public url: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService: UserService) {

                this.titulo ='Artistas'
                this.url = GLOBALENDPOINT.url;

    }

  ngOnInit() {
    //recolectamos lo que este en el localestorage
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log('identity artist',this.identity)
    //Conseguir el listado de artistas.

  }

}
