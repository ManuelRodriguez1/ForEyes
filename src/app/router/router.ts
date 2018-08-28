import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../services/auth.guard";
import { UserResolver } from "../components/user/user.resolver";

import { LoginComponent } from "../components/login/login.component";
import { HomeComponent } from "../components/home/home.component";
import { UserComponent } from "../components/user/user.component";
import { RegisterComponent } from "../components/register/register.component";

const APPROUTERS: Routes = [
    { path: 'Login', component: LoginComponent, canActivate: [AuthGuard]},
    { path: 'Home', component: HomeComponent},
    { path: 'Profile', component: UserComponent, resolve: { data: UserResolver}},
    { path: 'Register', component: RegisterComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'Login'}
]

export const APP_ROUTER = RouterModule.forRoot(APPROUTERS, { useHash: false })