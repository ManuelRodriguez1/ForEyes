import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireStorageModule } from "angularfire2/storage";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AppComponent } from './app.component';
import { WinterComponent } from './components/user/weather/winter/winter.component';
import { SpringComponent } from './components/user/weather/spring/spring.component';
import { SummerComponent } from './components/user/weather/summer/summer.component';
import { FallComponent } from './components/user/weather/fall/fall.component';
import { HolidayComponent } from './components/user/weather/holiday/holiday.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { WeatherComponent } from './components/user/weather/weather.component';
import { ContentComponent } from './components/user/content/content.component';
import { SliderComponent } from './components/slider/slider.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileSizePipe } from './pipes/file-size.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTER } from './router/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { UserResolver } from './components/user/user.resolver';
import { AuthGuard } from './services/auth.guard';
import { Slider2Component } from './components/slider2/slider2.component';
import { AdItemDirective } from './directives/ad-item.directive';
import { PruebaComponent } from './components/user/weather/prueba/prueba.component';
import { AdService } from './components/user/weather/ad.service';

@NgModule({
  declarations: [
    AppComponent,
    WinterComponent,
    SpringComponent,
    SummerComponent,
    FallComponent,
    HolidayComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    RegisterComponent,
    WeatherComponent,
    ContentComponent,
    SliderComponent,
    DropZoneDirective,
    FileSizePipe,
    Slider2Component,
    AdItemDirective,
    PruebaComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    APP_ROUTER,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard,AdService],
  bootstrap: [AppComponent],
  entryComponents: [FallComponent, HolidayComponent]

})
export class AppModule { }
