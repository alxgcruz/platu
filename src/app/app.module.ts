import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/pages/login/login.component';
import { UsuariosComponent } from './components/pages/usuarios/usuarios.component';
import { AreasComponent } from './components/pages/areas/areas.component';
import { CarrerasComponent } from './components/pages/carreras/carreras.component';
import { GruposComponent } from './components/pages/grupos/grupos.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/pages/home/home.component';
import { UsuarioComponent } from './components/pages/usuario/usuario.component';
import { CarreraComponent } from './components/pages/carrera/carrera.component';
import { GrupoComponent } from './components/pages/grupo/grupo.component';
import { PipesModule } from './pipes/pipes.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UsuariosComponent,
    AreasComponent,
    CarrerasComponent,
    GruposComponent,
    HomeComponent,
    UsuarioComponent,
    CarreraComponent,
    GrupoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    PipesModule,
    AngularFireModule.initializeApp(environment.firebase, 'platu-4ff2e'),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
