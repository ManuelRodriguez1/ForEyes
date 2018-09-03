import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WinterComponent } from './winter/winter.component';
import { SpringComponent } from './spring/spring.component';
import { SummerComponent } from './summer/summer.component';
import { FallComponent } from './fall/fall.component';
import { HolidayComponent } from './holiday/holiday.component';

@NgModule({
  declarations: [
    AppComponent,
    WinterComponent,
    SpringComponent,
    SummerComponent,
    FallComponent,
    HolidayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
