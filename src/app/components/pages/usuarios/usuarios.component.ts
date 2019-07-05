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

  usuario = new UsuarioModel();
  usuarios: UsuarioModel[];
  cargando = false;

  constructor( private usuariosService: UsuariosService ) { }

  ngOnInit() {
    this.cargando = true;
    this.usuariosService.getAllUsuarios().subscribe( usuarios => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
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
        this.usuariosService.deleteUsuario( usuario.id );
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

    if ( this.usuario.id ) {
      this.usuariosService.updateUsuario( this.usuario );
    } else {
      this.usuariosService.addUsuario( this.usuario );
    }

  }

}
