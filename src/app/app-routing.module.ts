import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { CarrerasComponent } from './components/pages/carreras/carreras.component';
import { GruposComponent } from './components/pages/grupos/grupos.component';

const routes: Routes = [
  { path: 'login'   , component: LoginComponent },
  { path: 'home'    , component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'usuarios'    , component: UsuariosComponent, canActivate: [ AuthGuard ] },
  { path: 'carreras'    , component: CarrerasComponent, canActivate: [ AuthGuard ] },
  { path: 'grupos'    , component: GruposComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }