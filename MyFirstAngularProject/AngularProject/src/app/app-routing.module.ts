import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AdmintoolsComponent } from './components/shared/admintools/admintools.component';
import { RockpaperscissorComponent } from './components/rockpaperscissor/rockpaperscissor.component';
import { CookieclickerComponent } from './components/cookieclicker/cookieclicker.component';
import { SnakeComponent } from './components/snake/snake.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'admintools', component: AdmintoolsComponent},
  {path: 'gamerps', component: RockpaperscissorComponent},
  {path: 'gamecc', component: CookieclickerComponent},
  {path: 'snake', component: SnakeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
