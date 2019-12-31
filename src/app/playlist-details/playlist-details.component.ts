import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistService} from '../service/playlist.service';
import {PlayList} from '../playlist';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.scss']
})
export class PlaylistDetailsComponent implements OnInit {
  private id: number
  item: PlayList;
  constructor(private route: ActivatedRoute,
              private playlistService: PlaylistService,
              private router: Router) { }

  ngOnInit() {
   this.route.paramMap.subscribe(params => {
     this.id = +params.get('id')
     this.item= this.playlistService.getPlaylistById(this.id)
   })
  }

  viewNextPlaylist() {
    if(this.id < 3){
      this.id = this.id + 1
    } else {
      this.id = 1
    };
    this.router.navigate(['/playList', this.id])
  }



}
