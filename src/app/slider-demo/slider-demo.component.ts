import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider-demo',
  templateUrl: './slider-demo.component.html',
  styleUrls: ['./slider-demo.component.scss']
})
export class SliderDemoComponent implements OnInit {
  imgs: string[] = [
    'https://images.wallpaperscraft.com/image/darth_vader_armor_star_wars_film_hat_snow_93645_1920x1080.jpg',
    'https://images.wallpaperscraft.com/image/leon_jean_reno_killer_sunglasses_nose_354_1920x1080.jpg',
    'https://images.wallpaperscraft.com/image/genesis_terminator_robot_t_800_104021_1920x1080.jpg',
  ];
  imgSrc = null;
  imgCount: number;
  appliedClass: boolean;
  email: string;
  showAlert: boolean;

  constructor() {
    this.imgCount = 0;
    this.imgSrc = this.imgs[0];
    setInterval(() => {
      this.imgCount++;
      if (this.imgCount === this.imgs.length) {
        this.imgCount = 0;
      }
      this.imgSrc = this.imgs[this.imgCount];
    }, 1000);

    this.email = 'dcren2019@gmail.com';
    this.showAlert = false;
  }

  appliedStyle = () => {
    this.appliedClass = !this.appliedClass;
  }

  onKeyUp = (evt: any) => {
    console.log('key up', evt);
  }

  onKeyUp02 = (evt: any) => {
    console.log('key up', evt);
  }

  onKeyDown = (evt: any) => {
    console.log('key down', evt);
  }

  handleBlur = () => {
    console.log(this.email);
  }

  handleBlur02 = (evt: any) => {
    this.showAlert = evt.length > 9;
  }

  onKeyUp03 = (evt: string) => {
    this.showAlert = evt.length > 5;
  }

  ngOnInit() {
  }

}
