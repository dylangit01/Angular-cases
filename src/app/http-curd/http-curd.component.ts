import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlayList} from '../playlist';
import {FormArray, NgForm} from '@angular/forms';
import {PlaylistService} from '../service/playlist.service';
import {error} from 'util';

@Component({
  selector: 'app-http-curd',
  templateUrl: './http-curd.component.html',
  styleUrls: ['./http-curd.component.scss']
})
export class HttpCurdComponent implements OnInit {
  deleteID: number;

  playList: PlayList[];
  errorMsg: string;
  url = 'http://localhost:3200/playlist/';

  searchByArtist: string;
  searchByTrack: string;
  searchedSong: PlayList[] = [];
  emptySearchResult: boolean = false;

  // outdated below:
  // searchedSonglist: PlayList[];
  // private _searchArtist: string;
  // private _searchTrack: string;
  //
  // get searchArtist(): string {
  //   return this._searchArtist;
  // }
  //
  // set searchArtist(value: string) {
  //   this._searchArtist = value;
  //   this.searchedSonglist = this.searchSongArtist(value);
  // }
  //
  // searchSongArtist(searchString: string) {
  //   return this.playList.filter(list => list.artist.toLowerCase().indexOf(searchString.toLowerCase())
  //     !== -1
  //   );
  // }
  //
  // get searchTrack(): string {
  //   return this._searchTrack;
  // }
  //
  // set searchTrack(value: string) {
  //   this._searchTrack = value;
  //   this.searchedSonglist = this.searchSongTrack(value);
  // }
  //
  // searchSongTrack(searchString: string) {
  //   return this.playList.filter(list => list.track.toLowerCase().indexOf(searchString.toLowerCase())
  //     !== -1
  //   );
  // }

  newSong: PlayList = {
    id: null,
    artist: null,
    track: null,
    listened: null,
    favourite: null,
    songStyle: null,
    photoPath: null,
    password: null,
    confirmPassword: null,
  };

  constructor(private http: HttpClient, private playlistService: PlaylistService) {
    this.errorMsg = null;
  }

  ngOnInit() {  // 是不是要写在这个里面？
    // this.getData();
  }

  getData() {
    console.log(this.url);
    this.http.get<PlayList[]>(this.url).subscribe(data => this.playList = data,
      err => this.errorMsg = err.message);
  }

  // 这种写法和上面一种的区别，那种好？answer：上面的比较好，写明return的类型
  // getData() {
  //   this.errorMsg = ''
  //   return this.http.get(this.url).
  //   subscribe(list => this.playList = list,
  //       err => this.errorMsg = err.message
  //   );
  // }

  // private handleError(errorResponse: HttpErrorResponse) {
  //   if (errorResponse.error instanceof ErrorEvent) {
  //     console.error('Client Side Error: ', errorResponse.error.message);
  //   } else {
  //     console.error('Server Side Error: ', errorResponse);
  //   }
  //   return throwError('There is a problem with the service. We are notified & working on it. Please try it later');
  // }

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
    // 这里如何先拿到playlist的length？answer: 没必要写，系统会自动加上
    if (this.newSong.artist !== '' && this.newSong.track !== '') {
      // this.newSong.id = this.playList.length + 1;
      this.http.post(`${this.url}`, this.newSong).subscribe(data => {
          console.log('Post request succeed', data);
          // if error no exe next line
          this.playList.push(this.newSong);
        },
        error => {
          return console.log(error.message);
        });
    }
  }


  deleteList(id: number) {
    this.http.delete<PlayList>(`${this.url}${id}`).subscribe(data => {
      console.log('Delete Request is successful ', data);
    }, error => {
      console.log('error', error);
    });
    // next is to achieve ...
    this.playList = this.playList.filter(newList => {
      return newList.id !== id;
    });
  }

  ////////////search functions: 伊布用了两种查询的方式,两种方式都可以同时使用，或者一样一种方式：

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
    // this.searchedSong = []; //这个可以写在开头：
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

  /////////////////////////////////////

///////////////////////////////////
// what is void for? 就是没有返回值,平常写的时候被省略了
  saveCreatedList(newPlaylist: NgForm): void {
    console.log(newPlaylist.value);
  }


}
