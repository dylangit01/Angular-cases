import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlayList} from '../playlist';
import {NgForm} from '@angular/forms';
import {PlaylistService} from '../service/playlist.service';

@Component({
  selector: 'app-http-demo',
  templateUrl: './http-demo.component.html',
  styleUrls: ['./http-demo.component.scss']
})
export class HttpDemoComponent implements OnInit {
  playID;
  deleteID: number;
  playList: PlayList[];
  errorMsg: string;
  url = 'http://localhost:3000/playlist/';

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
    this.playlistService.getPlaylistData().subscribe(playlist => this.playList = playlist)
  }

  // getData() {
  //   this.errorMsg = '';
  //   console.log(this.url);
  //   return this.http.get<PlayList[]>(this.url).subscribe(data => this.playList = data,
  //     err => this.errorMsg = err.message);
  // }
  //
  // // 这种写法和上面一种的区别，那种好？answer：上面的比较好，写明return的类型
  // // getData() {
  // //   this.errorMsg = ''
  // //   return this.http.get(this.url).
  // //   subscribe(list => this.playList = list,
  // //       err => this.errorMsg = err.message
  // //   );
  // // }
  //
  // // private handleError(errorResponse: HttpErrorResponse) {
  // //   if (errorResponse.error instanceof ErrorEvent) {
  // //     console.error('Client Side Error: ', errorResponse.error.message);
  // //   } else {
  // //     console.error('Server Side Error: ', errorResponse);
  // //   }
  // //   return throwError('There is a problem with the service. We are notified & working on it. Please try it later');
  // // }
  //
  // updateChanges(songId: number, songArtist: string, songTrack: string, songListened: boolean, songFavourite: boolean) {
  //   const updSong = {
  //     id: songId,
  //     artist: songArtist,
  //     track: songTrack,
  //     listened: songListened,
  //     favourite: songFavourite
  //   };
  //   // console.log(updSong);
  //   // patch返回的是object, 不是数组，所以下面不用Playlist[]
  //   this.http.put<PlayList>(`${this.url}${songId}`, updSong).subscribe(data => {
  //     console.log('Patch Request is successful ', data);
  //   }, error => this.errorMsg = error.message);
  // }
  //
  // createNewlist() {
  //   // 这里如何先拿到playlist的length？answer: 没必要写，系统会自动加上
  //   if (this.newSong.artist !== '' && this.newSong.track !== '') {
  //     // this.newSong.id = this.playList.length + 1;
  //     this.http.post(`${this.url}`, this.newSong).subscribe(data => {
  //         console.log('Post request succeed', data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  //   } else {
  //     alert('artist & track fields are required');
  //   }
  //   this.newSong.artist = '';
  //   this.newSong.track = '';
  //   this.newSong.listened = null;
  //   this.newSong.favourite = null;
  // }
  //
  //
  // deleteList(i) {
  //   this.http.delete<PlayList>(`${this.url}${i}`).subscribe(data => {
  //     console.log('Delete Request is successful ', data);
  //   }, error => {
  //     console.log('error', error);
  //   });
  // }
  //
  // ///////////////////////////////////
  // private updateList() {
  //   return this.http.get(this.url).subscribe(data => console.log(data), error => console.log('err', error));
  // }

  ///////////////////////////////////


  // what is void for? 就是没有返回值,平常写的时候被省略了
  saveCreatedList(newPlaylist: NgForm): void {
    console.log(newPlaylist.value);
  }







}
