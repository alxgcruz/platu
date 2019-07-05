import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrupoModel } from '../models/grupo.model';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private gruposCollection: AngularFirestoreCollection<GrupoModel>;
  private grupos: Observable<GrupoModel[]>;
  grupoDoc: AngularFirestoreDocument<GrupoModel>;
  grupo: Observable<GrupoModel>;
  public selected: any = {
    id: null
  };

  constructor( private afs: AngularFirestore ) {
    this.gruposCollection = afs.collection<GrupoModel>('grupos');
    this.grupos = this.gruposCollection.valueChanges();
  }

  getAllGrupos() {
    return this.grupos = this.gruposCollection.snapshotChanges()
    .pipe( map( cambios => {
      return cambios.map( accion => {
        const data = accion.payload.doc.data() as GrupoModel;
        data.id = accion.payload.doc.id;
        return data;
      });
    }));
  }

  getOneGrupo(idgrupo: string) {
    this.grupoDoc = this.afs.doc<GrupoModel>(`grupos/${idgrupo}`);
    return this.grupo = this.grupoDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as GrupoModel;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addGrupo(grupo: GrupoModel): void {
    this.gruposCollection.add({...grupo}).then( resp => {
      Swal.fire({
        type: 'success',
        title: grupo.nombre,
        text: 'Se agregó correctamente'
      });
    });
  }

  updateGrupo(grupo: GrupoModel): void {
    const idgrupo = grupo.id;
    this.grupoDoc = this.afs.doc<GrupoModel>(`grupos/${idgrupo}`);
    this.grupoDoc.update(grupo).then( resp => {
      Swal.fire({
        type: 'success',
        title: grupo.nombre,
        text: 'Se actualizó correctamente'
      });
    });
  }

  deleteGrupo(idgrupo: string): void {
    this.grupoDoc = this.afs.doc<GrupoModel>(`grupos/${idgrupo}`);
    this.grupoDoc.delete();
  }


}
