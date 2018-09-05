import { Component } from '@angular/core';
import { AdService } from './components/user/weather/ad.service';
import { AdBanner } from './components/user/weather/ad-banner';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ads: AdBanner[];

  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = this.adService.getAds();
  }

}
