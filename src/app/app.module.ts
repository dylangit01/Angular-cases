import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SliderDemoComponent} from './slider-demo/slider-demo.component';
import {FormsModule} from '@angular/forms';
import {HttpDemoComponent} from './http-demo/http-demo.component';
import {HttpClientModule} from '@angular/common/http';
import {PlaylistComponent} from './playlist/playlist.component';
import {CreatePlaylistComponent} from './create-playlist/create-playlist.component';
import {RouterModule, Routes} from '@angular/router';
import {SelectRequiredValidatorDirective} from './shared/select-required-validator.directive';
import {ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import {PlaylistService} from './service/playlist.service';
import { PlaylistchildComponent } from './playlistchild/playlistchild.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import {PlaylistFilterPipe} from './playlist/playlist-filter.pipe';
import {HttpCurdComponent} from './http-curd/http-curd.component';
import { HttpGitDemoComponent } from './http-git-demo/http-git-demo.component'

const appRoutes: Routes = [
  {path: 'playlist', component: PlaylistComponent},
  {path: 'edit/:id', component: CreatePlaylistComponent},
  {path: 'playList/:id', component: PlaylistDetailsComponent}, // 这里的playList一定要是列表的名称，只有列表才有Id
  {path: '', redirectTo: '/playlist', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SliderDemoComponent,
    HttpDemoComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    PlaylistchildComponent,
    PlaylistDetailsComponent,
    PlaylistFilterPipe,
    HttpCurdComponent,
    HttpGitDemoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PlaylistService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
