import {Component, OnInit} from '@angular/core';
import {PlayList} from '../playlist';
import {NgForm} from '@angular/forms';
import {SongStyle} from '../songStyle';
import {PlaylistService} from '../service/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  previewPhoto = false;

  newPlaylist: PlayList

  songStyles: SongStyle[] = [
    {id: 1, name: 'Electronic Music'},
    {id: 2, name: 'Psymind Music'},
    {id: 3, name: 'Rock Music'},
    {id: 4, name: 'Pop Music'},
    {id: 5, name: 'Soft Music'}
  ];

  // playList: PlayList =  {
  //   id: null,
  //   artist: null,
  //   track: null,
  //   listened: null,
  //   favourite: null,
  // };

  // below for default radio button value, so in HTML, doesnt need "checked" anymore,
  // listened = 'true';
  // favourite = 'true';
  // songStyles = '1' //set default dropdown value is 1, which is Electronic Music

  constructor(private playlistService: PlaylistService, private router: Router,
              private route: ActivatedRoute) {
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => {
      const id = + parameterMap.get('id')
      this.getPlaylist(id)
    })
  }

  private getPlaylist(id: number){
    if(id===0) {
      this.newPlaylist = {
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
    } else {
      this.newPlaylist = this.playlistService.getPlaylistById(id)
    }
  }





  // NgForm 是这个newForm的类型
  saveCreatedlist(newForm: NgForm): void {
    console.log(newForm.value);
  }
  // Now, we gonna pass all the info. into the newPlaylist from ngForm, so change to below:
  saveNewPlaylist(newPlaylist: PlayList): void {
    console.log(newPlaylist);
  }

  /* Under server modules, we use below one: because we already define the
  newPlayList as above and all the obj properties are defined, and in the
  angular Form model, we use two way data binding to get all info., and sync to
  the newPlaylist, so we dont need to pass that obj as the parameter
  to the save new list method from the view template.
   */

  /* get all info. from the ngForm, and use serve method to push the new
  list into the original playlist
   */

  saveNewPlaylistServer() {
    this.playlistService.saveNewPlaylistIntoServer(this.newPlaylist);
    this.router.navigate(['playlist'])
  }






}
