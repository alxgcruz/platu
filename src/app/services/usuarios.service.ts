import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuariosCollection: AngularFirestoreCollection<UsuarioModel>;
  private usuarios: Observable<UsuarioModel[]>;
  usuarioDoc: AngularFirestoreDocument<UsuarioModel>;
  usuario: Observable<UsuarioModel>;
  public selected: any = {
    id: null
  };

  constructor( private afs: AngularFirestore, private auth: AuthService ) {
    this.usuariosCollection = afs.collection<UsuarioModel>('usuarios');
    this.usuarios = this.usuariosCollection.valueChanges();
  }

  getAllUsuarios() {
    return this.usuarios = this.usuariosCollection.snapshotChanges()
    .pipe( map( cambios => {
      return cambios.map( accion => {
        const data = accion.payload.doc.data() as UsuarioModel;
        data.id = accion.payload.doc.id;
        return data;
      });
    }));
  }

  getOneUsuario(idusuario: string) {
    this.usuarioDoc = this.afs.doc<UsuarioModel>(`usuarios/${idusuario}`);
    return this.usuario = this.usuarioDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as UsuarioModel;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addUsuario(usuario: UsuarioModel): void {
    this.usuariosCollection.add({...usuario}).then( resp => {
      this.auth.registerUser(usuario.email, usuario.password);
      Swal.fire({
        type: 'success',
        title: usuario.nombre,
        text: 'Se agregó correctamente'
      });
    });
  }

  updateUsuario(usuario: UsuarioModel): void {
    const idusuario = usuario.id;
    this.usuarioDoc = this.afs.doc<UsuarioModel>(`usuarios/${idusuario}`);
    this.usuarioDoc.update(usuario).then( resp => {
      Swal.fire({
        type: 'success',
        title: usuario.nombre,
        text: 'Se actualizó correctamente'
      });
    });
  }

  deleteUsuario(idusuario: string): void {
    this.usuarioDoc = this.afs.doc<UsuarioModel>(`usuarios/${idusuario}`);
    this.usuarioDoc.delete();
  }


}
