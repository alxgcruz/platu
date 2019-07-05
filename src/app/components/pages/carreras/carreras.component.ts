import { Component, OnInit } from '@angular/core';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {

  carreras: CarreraModel[] = [];
  cargando = false;
  carrera = new CarreraModel();

  constructor( private carrerasService: CarrerasService ) { }

  ngOnInit() {
    this.cargando = true;
    this.carrerasService.getCarreras()
    .subscribe( resp => {
      this.cargando = false;
      this.carreras = resp;
    });
  }

  borrarCarrera( carrera: CarreraModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Se borrará al carrera ${ carrera.id }`,
      type: 'question',
      showCancelButton: true,
      showConfirmButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.carreras.splice(i, 1);
        this.carrerasService.borrarCarrera( carrera.id ).subscribe();
      }
    });

  }

  abrirModal( career? ) {
    if ( career ) {
      this.carrera = career;
    } else {
      this.carrera = new CarreraModel();
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

    if ( this.carrera.id ) {
      peticion = this.carrerasService.actualizarCarrera( this.carrera );
    } else {
      peticion = this.carrerasService.crearCarrera( this.carrera );
    }

    peticion.subscribe( resp => {
      // $('#modelId').modal('hide');
      Swal.fire({
        type: 'success',
        title: this.carrera.nombre,
        text: 'Se actualizó correctamente'
      });
    });

  }

}
