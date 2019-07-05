import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];
  cargando = false;
  usuario = new UsuarioModel();

  constructor( private usuariosService: UsuariosService ) { }

  ngOnInit() {

    this.cargando = true;
    this.usuariosService.getUsuarios()
    .subscribe( resp => {
      this.cargando = false;
      this.usuarios = resp;
    });
  }

  borrarUsuario( usuario: UsuarioModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Se borrará al usuario ${ usuario.id }`,
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.usuarios.splice(i, 1);
        this.usuariosService.borrarUsuario( usuario.id ).subscribe();
      }
    });

  }

  abrirModal( user? ) {
    if ( user ) {
      this.usuario = user;
    } else {
      this.usuario = new UsuarioModel();
    }
  }

  guardar( form: NgForm ) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      title: 'Espere',
      text: 'Guardando Información'
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.usuario.id ) {
      peticion = this.usuariosService.actualizarUsuario( this.usuario );
    } else {
      peticion = this.usuariosService.crearUsuario( this.usuario );
    }

    peticion.subscribe( resp => {
      // $('#modelId').modal('hide');
      Swal.fire({
        type: 'success',
        title: this.usuario.nombreCompleto,
        text: 'Se actualizó correctamente'
      });
    });

  }

}
