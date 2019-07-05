import { Injectable } from '@angular/core';
import { CarreraModel } from '../models/carrera.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private url = 'https://platu-4ff2e.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearCarrera( carrera: CarreraModel ) {
    return this.http.post(`${ this.url }/carreras.json`, carrera )
        .pipe(map( resp => {
            // tslint:disable-next-line: no-string-literal
            carrera.id = resp['name'];
            return carrera;
        }));
  }

  actualizarCarrera( carrera: CarreraModel ) {
    const careerTemp = { ...carrera };

    delete careerTemp.id;

    return this.http.put(`${ this.url }/carreras/${ carrera.id }.json`, careerTemp);
  }

  getCarreras() {
    return this.http.get(`${ this.url }/carreras.json`)
        .pipe( map( this.crearArreglo ) );
  }

  private crearArreglo( careersObj: object ) {
    const careers: CarreraModel[] = [];

    if ( careersObj == null ) { return[]; }

    Object.keys( careersObj ).forEach( key => {
      const career: CarreraModel = careersObj[ key ];
      career.id = key;
      careers.push(career);
    });

    return careers;
  }

  getCarrera( id: string ) {
    return this.http.get(`${ this.url }/carreras/${ id }.json`);
  }

  borrarCarrera( id: string ) {
    return this.http.delete(`${ this.url }/carreras/${ id }.json`);
  }

}
