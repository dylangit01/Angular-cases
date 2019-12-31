import {Injectable} from '@angular/core';
import {PlayList} from '../playlist';
import {Observable, of} from 'rxjs';

@Injectable()
export class PlaylistService {
  private songPlaylist: PlayList[]= [
    {
      id: 1,
      artist: 'Oasis',
      track: 'Half The World Away',
      listened: true,
      favourite: true,
      songStyle: 'Electronic Music',
      photoPath: 'assets/images/1.jpg',
      password: '',
      confirmPassword: '',
    },
    {
      id: 2,
      artist: 'Pink Floyd',
      track: 'Wish You Were Here',
      listened: true,
      favourite: true,
      songStyle: 'Psymind Music',
      photoPath: 'assets/images/2.jpg',
      password: '',
      confirmPassword: '',
    },
    {
      id: 3,
      artist: 'Blink-182',
      track: 'All The Small Things',
      listened: true,
      favourite: false,
      songStyle: 'Pop Music',
      photoPath: 'assets/images/3.jpg',
      password: '',
      confirmPassword: '',
    }
  ];

  getPlaylistData(): Observable<PlayList[]> {
    return of(this.songPlaylist)
  }

  getPlaylistById(id: number): PlayList {
    return this.songPlaylist.find(e => e.id === id)
  }

  saveNewPlaylistIntoServer(playlist: PlayList){
    this.songPlaylist.push(playlist)
  }

}
