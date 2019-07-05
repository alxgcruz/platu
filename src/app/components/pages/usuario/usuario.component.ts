import { Component, OnInit, Input } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @Input() usuario: UsuarioModel;

  constructor( private usuariosService: UsuariosService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id') || null;

    if ( id !== 'nuevo' &&  id !== null) {
      this.usuariosService.getOneUsuario( id )
        .subscribe( (resp: UsuarioModel) => {
          console.log(resp);
          this.usuario = resp;
          this.usuario.id = id;
        });
    }
  }

}
