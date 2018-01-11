import { Component, OnInit } from '@angular/core';
//model
import {Song} from '../../models/song';
//Api
import {GLOBALENDPOINT} from '../../services/global';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public url: string;
	public song;
  constructor() { 
    this.url = GLOBALENDPOINT.url;
  }

  ngOnInit() {
    console.log('player cargado');

		var song = JSON.parse(localStorage.getItem('sound_song'));
		if(song){
			this.song = song;
		}else{
			this.song = new Song(1, "","","","");
		}
  }

}
