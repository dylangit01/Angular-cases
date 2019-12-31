import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlayList} from '../playlist';
import {NgForm} from '@angular/forms';
import {PlaylistService} from '../service/playlist.service';

@Component({
  selector: 'app-http-git-demo',
  templateUrl: './http-git-demo.component.html',
  styleUrls: ['./http-git-demo.component.scss']
})
export class HttpGitDemoComponent implements OnInit {
  deleteID: number;
  playList: PlayList[];
  errorMsg: string;
  url = 'http://localhost:3000/playlist/';

  searchByArtist: string;
  searchByTrack: string;
  searchedSong: PlayList[] = [];
  emptySearchResult: boolean = false;

  searchedSonglist: PlayList [];
  private _searchArtist: string;
  private _searchTrack: string;

  get searchArtist(): string {
    return this._searchArtist;
  }

  set searchArtist(value: string) {
    this._searchArtist = value;
    this.searchedSonglist = this.searchSongArtist(value);
  }

  searchSongArtist(searchString: string) {
    return this.playList.filter(list => list.artist.toLowerCase().indexOf(searchString.toLowerCase())
      !== -1
    );
  }

  get searchTrack(): string {
    return this._searchTrack;
  }

  set searchTrack(value: string) {
    this._searchTrack = value;
    this.searchedSonglist = this.searchSongTrack(value);
  }

  searchSongTrack(searchString: string) {
    return this.playList.filter(list => list.track.toLowerCase().indexOf(searchString.toLowerCase())
      !== -1
    );
  }

  newSong: PlayList = {
    id: 0,
    artist: '',
    track: '',
    listened: null,
    favourite: null,
    songStyle: null,
    photoPath: null,
    password: null,
    confirmPassword: null,
  };

  constructor(private http: HttpClient, private playlistService: PlaylistService) {
  }

  ngOnInit() {  // 是不是要写在这个里面？
    this.getData()
  }

  getData() {
    this.errorMsg = '';
    console.log(this.url);
    return this.http.get<PlayList[]>(this.url).subscribe(data => this.playList = data,
      err => this.errorMsg = err.message);
  }

  updateChanges(songId: number, songArtist: string, songTrack: string, songListened: boolean, songFavourite: boolean) {
    const updSong = {
      id: songId,
      artist: songArtist,
      track: songTrack,
      listened: songListened,
      favourite: songFavourite,
      songStyle: null,
      photoPath: null,
      password: null,
      confirmPassword: null,
    };
    // console.log(updSong);
    // patch返回的是object, 不是数组，所以下面不用Playlist[]
    this.http.put<PlayList>(`${this.url}${songId}`, updSong).subscribe(data => {
      console.log('Patch Request is successful ', data);
    }, error => this.errorMsg = error.message);
  }

  createNewlist() {
    if (this.newSong.artist !== '' && this.newSong.track !== '') {
      // this.newSong.id = this.playList.length + 1;
      this.http.post(`${this.url}`, this.newSong).subscribe(data => {
          console.log('Post request succeed', data);
        },
        error => {
          console.log(error);
        });
    } else {
      alert('artist & track fields are required');
    }
    this.playList.push(this.newSong);
  }

  deleteList(id: number) {
    this.http.delete<PlayList>(`${this.url}${id}`).subscribe(data => {
      console.log('Delete Request is successful ', data);
    }, error => {
      console.log('error', error);
    });
    this.playList = this.playList.filter(newList => {
      return newList.id !== id;
    });
  }

  searchByArtistF() {
    this.searchedSong = this.playList;  //
    this.searchedSong = this.searchedSong.filter(song => {
      return (String(song.artist) === String(this.searchByArtist));
    });

    if (this.searchedSong.length === 0) {
      this.emptySearchResult = true;
    } else {
      this.emptySearchResult = false;
    }
    this.searchByArtist = '';
    this.searchByTrack = '';
  }

  searchByTrackF() {
    this.playList.forEach(song => {
      if (song.track === this.searchByTrack) {
        this.searchedSong.push(song);
      }
    });

    if (this.searchedSong.length === 0) {
      this.emptySearchResult = true;
    } else {
      this.emptySearchResult = false;
    }
    // clear search result
    this.searchByArtist = '';
    this.searchByTrack = '';
  }

  saveCreatedList(newPlaylist: NgForm): void {
    console.log(newPlaylist.value);
  }

}
