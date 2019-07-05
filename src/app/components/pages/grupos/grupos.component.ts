import { Component, OnInit } from '@angular/core';
import { GrupoModel } from 'src/app/models/grupo.model';
import { GruposService } from 'src/app/services/grupos.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { CarrerasService } from 'src/app/services/carreras.service';
import { CarreraModel } from 'src/app/models/carrera.model';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupo = new GrupoModel();
  grupos: GrupoModel[];
  cargando = false;
  carreras: CarreraModel[];
  carrera = new CarreraModel();

  constructor( private gruposService: GruposService, private carrerasService: CarrerasService ) { }

  ngOnInit() {
    this.cargando = true;
    this.cargarCarreras();

    this.gruposService.getAllGrupos().subscribe( grupos => {
      console.log(grupos);
      this.grupos = grupos;
      this.cargando = false;
    });
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
        this.gruposService.deleteGrupo( grupo.id );
      }
    });

  }

  abrirModal( group? ) {
    if ( group ) {
      this.grupo = group;
      this.carrera = this.carreras.find( (item: CarreraModel) => {
        return item.id === this.grupo.carrera;
      });
    } else {
      this.grupo = new GrupoModel();
      this.carrera = this.carreras[0];
    }
  }

  guardar( form: NgForm ) {

    if ( form.invalid ) { return; }


    this.grupo.carrera = this.carrera.id;

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      title: 'Espere',
      text: 'Guardando Información'
    });
    Swal.showLoading();

    if ( this.grupo.id ) {
      this.gruposService.updateGrupo( this.grupo );
    } else {
      this.gruposService.addGrupo( this.grupo );
    }

  }

  async cargarCarreras() {
    await this.carrerasService.getAllCarreras().subscribe( carreras => {
      console.log(carreras);
      this.carreras = carreras;
    });
  }

}
