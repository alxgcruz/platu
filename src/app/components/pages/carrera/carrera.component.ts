import { Component, OnInit, Input } from '@angular/core';
import { CarreraModel } from 'src/app/models/carrera.model';
import { ActivatedRoute } from '@angular/router';
import { CarrerasService } from 'src/app/services/carreras.service';

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {

  @Input() carrera: CarreraModel;

  constructor( private carrerasService: CarrerasService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id') || null;

    if ( id !== 'nuevo' &&  id !== null) {
      this.carrerasService.getCarrera( id )
        .subscribe( (resp: CarreraModel) => {
          console.log(resp);
          this.carrera = resp;
          this.carrera.id = id;
        });
    }
  }

}
