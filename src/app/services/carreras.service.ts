import { Injectable } from '@angular/core';
import { CarreraModel } from '../models/carrera.model';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private carrerasCollection: AngularFirestoreCollection<CarreraModel>;
  private carreras: Observable<CarreraModel[]>;
  carreraDoc: AngularFirestoreDocument<CarreraModel>;
  carrera: Observable<CarreraModel>;
  public selected: any = {
    id: null
  };

  constructor( private afs: AngularFirestore ) {
    this.carrerasCollection = afs.collection<CarreraModel>('carreras');
    this.carreras = this.carrerasCollection.valueChanges();
  }

  getAllCarreras() {
    return this.carreras = this.carrerasCollection.snapshotChanges()
    .pipe( map( cambios => {
      return cambios.map( accion => {
        const data = accion.payload.doc.data() as CarreraModel;
        data.id = accion.payload.doc.id;
        return data;
      });
    }));
  }

  getOneCarrera(idcarrera: string) {
    this.carreraDoc = this.afs.doc<CarreraModel>(`carreras/${idcarrera}`);
    return this.carrera = this.carreraDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as CarreraModel;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addCarrera(carrera: CarreraModel): void {
    this.carrerasCollection.add({...carrera}).then( resp => {
      Swal.fire({
        type: 'success',
        title: carrera.nombre,
        text: 'Se agregó correctamente'
      });
    });
  }

  updateCarrera(carrera: CarreraModel): void {
    const idcarrera = carrera.id;
    this.carreraDoc = this.afs.doc<CarreraModel>(`carreras/${idcarrera}`);
    this.carreraDoc.update(carrera).then( resp => {
      Swal.fire({
        type: 'success',
        title: carrera.nombre,
        text: 'Se actualizó correctamente'
      });
    });
  }

  deleteCarrera(idcarrera: string): void {
    this.carreraDoc = this.afs.doc<CarreraModel>(`carreras/${idcarrera}`);
    this.carreraDoc.delete();
  }

}
