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

  carrera = new CarreraModel();
  carreras: CarreraModel[];
  cargando = false;

  constructor( private carrerasService: CarrerasService ) { }

  ngOnInit() {
    this.cargando = true;
    this.carrerasService.getAllCarreras().subscribe( carreras => {
      console.log(carreras);
      this.carreras = carreras;
      this.cargando = false;
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
        this.carrerasService.deleteCarrera( carrera.id );
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

    if ( this.carrera.id ) {
      this.carrerasService.updateCarrera( this.carrera );
    } else {
      this.carrerasService.addCarrera( this.carrera );
    }

  }

}
