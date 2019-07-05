import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrupoModel } from '../models/grupo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private url = 'https://platu-4ff2e.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearGrupo( grupo: GrupoModel ) {

    console.log('grupoService->', grupo);

    return this.http.post(`${ this.url }/grupos.json`, grupo )
        .pipe(map( resp => {
            // tslint:disable-next-line: no-string-literal
            grupo.id = resp['name'];
            return grupo;
        }));
  }

  actualizarGrupo( grupo: GrupoModel ) {

    const groupTemp = { ...grupo };

    delete groupTemp.id;

    return this.http.put(`${ this.url }/grupos/${ grupo.id }.json`, groupTemp);

  }

  getGrupos() {
    return this.http.get(`${ this.url }/grupos.json`)
        .pipe( map( this.crearArreglo ) );
  }

  private crearArreglo( groupsObj: object ) {

    const groups: GrupoModel[] = [];

    if ( groupsObj == null ) { return[]; }

    Object.keys( groupsObj ).forEach( key => {
      const group: GrupoModel = groupsObj[ key ];
      group.id = key;
      groups.push(group);
    });

    return groups;

  }

  getGrupo( id: string ) {
    return this.http.get(`${ this.url }/grupos/${ id }.json`);
  }

  borrarGrupo( id: string ) {
    return this.http.delete(`${ this.url }/grupos/${ id }.json`);
  }


}
