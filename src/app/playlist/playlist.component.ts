import {Component, OnInit} from '@angular/core';
import {PlayList} from '../playlist';
import {PlaylistService} from '../service/playlist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playList: PlayList[];
  filteredPlaylist: PlayList[];
  private _searchTerm: string;

  get searchTerm():string {
    return this._searchTerm;
  }

  set searchTerm(setValue: string){
    this._searchTerm = setValue
    this.filteredPlaylist = this.filterPlaylist(setValue)
  }

  filterPlaylist(searchString: string){
    return this.playList.filter(playlist =>
      playlist.artist.toLowerCase().indexOf(searchString.toLowerCase()) !==-1 )
  }




  // playlistToDisplay: PlayList;
  // private arrayCount: number;
  // dataFromChild: PlayList;


  // inject the service into this component
  constructor(private playlistService: PlaylistService,
              private router: Router) {
    // this.arrayCount = 0  // this is for displaying one playlist function
  }

  ngOnInit() {
    this.playlistService.getPlaylistData().subscribe(playlist => this.playList =playlist);
    this.filteredPlaylist = this.playList
    // this.playlistToDisplay = this.playList[0]; // this is for displaying one playlist function
  }

  // One way to achieve the child data to parent view
  // (notify) gets string data from child, and pass it to this.dataFromChild
  // handleNotify(eventData: PlayList) {
  //   this.dataFromChild = eventData
  // }


  // Below is for displaying one playlist function
  // nextPlaylist(): void {
  //   if (this.arrayIndex <= 2) {
  //     this.playlistToDisplay = this.playList[this.arrayIndex];
  //     this.arrayIndex++;
  //   } else {
  //     this.playlistToDisplay = this.playList[0];
  //     this.arrayIndex = 1;
  //   }
  // }
  //下面的方法更简单方便
  // nextPlaylist2() {
  //  const arrayIndex = ++this.arrayCount % this.playList.length
  //   this.playlistToDisplay = this.playList[arrayIndex]
  // }

  // Below is for displaying list detail






}
