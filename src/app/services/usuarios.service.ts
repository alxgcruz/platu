import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = 'https://platu-4ff2e.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearUsuario( usuario: UsuarioModel ) {
    return this.http.post(`${ this.url }/usuarios.json`, usuario )
        .pipe(map( resp => {
            // tslint:disable-next-line: no-string-literal
            usuario.id = resp['name'];
            return usuario;
        }));
  }

  actualizarUsuario( usuario: UsuarioModel ) {
    const userTemp = { ...usuario };

    delete userTemp.id;

    return this.http.put(`${ this.url }/usuarios/${ usuario.id }.json`, userTemp);
  }

  getUsuarios() {
    return this.http.get(`${ this.url }/usuarios.json`)
        .pipe( map( this.crearArreglo ) );
  }

  private crearArreglo( usersObj: object ) {
    const users: UsuarioModel[] = [];

    if ( usersObj == null ) { return[]; }

    Object.keys( usersObj ).forEach( key => {
      const user: UsuarioModel = usersObj[ key ];
      user.id = key;
      users.push(user);
    });

    return users;
  }

  getUsuario( id: string ) {
    return this.http.get(`${ this.url }/usuarios/${ id }.json`);
  }

  borrarUsuario( id: string ) {
    return this.http.delete(`${ this.url }/usuarios/${ id }.json`);
  }

}
