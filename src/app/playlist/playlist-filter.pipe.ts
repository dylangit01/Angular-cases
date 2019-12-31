import {Pipe, PipeTransform} from '@angular/core';
import {PlayList} from '../playlist';


@Pipe({
  name: 'itemFilter'
})

export class PlaylistFilterPipe implements PipeTransform{
  transform(playList: PlayList[],searchTerm: string): PlayList[] {
    if(!playList || !searchTerm){
      return playList
    }
    return playList.filter(playlist =>
      playlist.artist.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }
}
