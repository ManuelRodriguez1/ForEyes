import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../services/auth.guard";
import { UserResolver } from "../components/user/user.resolver";

import { LoginComponent } from "../components/login/login.component";
import { HomeComponent } from "../components/home/home.component";
import { UserComponent } from "../components/user/user.component";
import { RegisterComponent } from "../components/register/register.component";
import { WeatherComponent } from "../components/user/weather/weather.component";
import { ContentComponent } from "../components/user/content/content.component";
import { SliderComponent } from "../components/slider/slider.component";

const APPROUTERS: Routes = [
    { path: 'Login', component: LoginComponent, canActivate: [AuthGuard]},
    { path: 'Home', component: HomeComponent},
    { path: 'Profile', component: UserComponent, resolve: { data: UserResolver}},
    { path: 'Weather', component: WeatherComponent, resolve: { data: UserResolver}},
    { path: 'Content', component: ContentComponent, resolve: { data: UserResolver}},
    { path: 'Slider', component: SliderComponent},
    { path: 'Register', component: RegisterComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'Login'}
]

export const APP_ROUTER = RouterModule.forRoot(APPROUTERS, { useHash: false })