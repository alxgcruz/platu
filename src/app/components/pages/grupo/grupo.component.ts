import { Component, OnInit, Input } from '@angular/core';
import { GrupoModel } from 'src/app/models/grupo.model';
import { GruposService } from 'src/app/services/grupos.service';
import { ActivatedRoute } from '@angular/router';
import { CarrerasService } from 'src/app/services/carreras.service';
import { CarreraModel } from 'src/app/models/carrera.model';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  @Input() grupo: GrupoModel;
  carreras: CarreraModel[] = [];
  carrera = new CarreraModel();

  constructor( private gruposService: GruposService,
               private carrerasService: CarrerasService,
               private route: ActivatedRoute ) {
              this.carrerasService.getCarreras()
                .subscribe( resp => {
                  this.carreras = resp;
                });
               }

  async ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id') || null;

    if ( id !== 'nuevo' &&  id !== null) {

      this.gruposService.getGrupo( id )
        .subscribe( (resp: GrupoModel) => {

          console.log(resp);
          this.grupo = resp;
          this.grupo.id = id;

        });

    }
    console.log('grupo.component->', this.grupo);
  }

}
