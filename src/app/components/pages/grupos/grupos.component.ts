import { Component, OnInit } from '@angular/core';
import { GrupoModel } from 'src/app/models/grupo.model';
import { GruposService } from 'src/app/services/grupos.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  constructor( private gruposService: GruposService, private carrerasService: CarrerasService ) { }

  grupo   = new GrupoModel();
  grupos: GrupoModel[] = [];
  carrera = new CarreraModel();
  carreras: CarreraModel[] = [];
  cargando = false;


  ngOnInit() {

    this.cargando = true;
    this.cargaCarreras();
    this.cargaGrupos();

  }

  abrirModal( group? ) {

    if ( group ) {
      this.grupo = group;
      this.carrera = this.carreras.find( item => {
        return item.id === this.grupo.carrera;
      });
    } else {
      this.grupo = new GrupoModel();
      this.carrera = this.carreras[0];
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

    this.grupo.carrera = this.carrera.id;

    if ( this.grupo.id ) {
      this.gruposService.actualizarGrupo( this.grupo )
      .subscribe( resp => {

        Swal.fire({
          type: 'success',
          title: this.grupo.nombre,
          text: 'Se actualizó correctamente'
        });

      });
    } else {
      this.gruposService.crearGrupo( this.grupo )
      .subscribe( resp => {

        Swal.fire({
          type: 'success',
          title: this.grupo.nombre,
          text: 'Se guardó correctamente'
        });

        this.grupos.push( resp );

      });
    }


  }

  borrarGrupo( grupo: GrupoModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Se borrará al grupo ${ grupo.id }`,
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.grupos.splice(i, 1);
        this.gruposService.borrarGrupo( grupo.id ).subscribe();
      }
    });

  }


  async cargaGrupos() {
    await this.gruposService.getGrupos()
    .subscribe( resp => {
      this.cargando = false;
      this.grupos = resp;
    });
  }

  async cargaCarreras() {
    await this.carrerasService.getCarreras()
      .subscribe( resp => {
        this.carreras = resp;
        this.carrera = this.carreras[0];
      });
  }

}
