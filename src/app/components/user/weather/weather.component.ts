import { Component, OnInit, Injectable } from '@angular/core';
import { FallComponent } from "./fall/fall.component";
import { HolidayComponent } from "./holiday/holiday.component";
import { AdBanner } from "./ad-banner";

@Injectable()
export class AdService {
  getAds() {
    return [
      new AdBanner(FallComponent, {name: '1Aprende Vue.js 2', price: '20€', info: 'Nueva entrada sobre Vue.js 2'}),
      new AdBanner(HolidayComponent, {title: '2Curso de Angular 5 y Firestore', body: 'Desarrollando una tienda en tiempo real'}),
      new AdBanner(FallComponent, {name: '3Curso de Laravel 5.5', price: '25€', info: 'Aprende Laravel 5.5 desde 0'}),
      new AdBanner(HolidayComponent, {title: '4Tutorial de Angular 5', body: 'Angular 5, deploy en Firebase!'}),
    ];
  }
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent  {
}
