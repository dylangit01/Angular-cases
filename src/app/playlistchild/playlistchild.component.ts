import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PlayList} from '../playlist';
import {Router} from '@angular/router';
import {query} from '@angular/animations';

@Component({
  selector: 'app-playlistchild',
  templateUrl: './playlistchild.component.html',
  styleUrls: ['./playlistchild.component.scss']
})
export class PlaylistchildComponent implements OnInit /*,OnChanges */ {

  // by using @Input, we input "item" from parent
  @Input() item: PlayList
  @Input() searchTerm: string

  // The 1st method to pass data from child to parent, using @Output xxx: EventEmitter...
  // @Output() notify: EventEmitter<PlayList> = new EventEmitter<PlayList>();

  //  ngOnChanges: one method to achieve logging the changing playlist info.
  // ngOnChanges(changes:SimpleChanges){
  //   const prePlaylist = <PlayList>changes.item.previousValue
  //   const curPlaylist = <PlayList>changes.item.currentValue
  //
  //   console.log('Previous :' + (prePlaylist? prePlaylist.artist : 'NULL'))
  //   console.log('Current :' + curPlaylist.artist)
  // }

  /* Pattern setter: another way to achieve this changing info. is to change the @Input above,
  so we need to remove onChanges */
  /* val is getting info. from item, which is the playlist of parent html,
  remember, the name of "item" must be the same of playlist ngFor name: let "item" of playlist
  */

  // private _playlist: PlayList
  // @Input()
  // set item(val: PlayList){
  //   console.log('Previous :' + (this._playlist? this._playlist.artist : 'NULL'));
  //   console.log('Current :' + val.artist)
  //   this._playlist = val
  // }
  // get item(): PlayList {
  //   return this._playlist
  // }

  constructor(private router: Router) { }

  ngOnInit() {

  }

  viewPlaylist() {
    this.router.navigate(['/playList', this.item.id], {
        queryParams: {'searchTerm': this.searchTerm}
      });
  }

  editPlaylist() {
    this.router.navigate(['/edit', this.item.id]);
  }



  // when at child html, (click) trans item.artist to this.notify, and (notify) pass to parent html view
  // handleClick() {
  //   this.notify.emit(this.item)
  // }

  getItemOfPlaylistData():string {
    return this.item.artist + ': ' + this.item.track
  }












}
