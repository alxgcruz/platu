import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
    if ( localStorage.getItem('email') ) {

      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;

    } else {
      localStorage.getItem('email');
    }
  }

  login( form: NgForm ) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.usuario )
    .subscribe( (resp) => {

      Swal.close();

      if ( this.recordarme ) {
        // tslint:disable-next-line: no-string-literal
        localStorage.setItem('email', this.usuario['email']);
      }

      this.router.navigateByUrl('/home');

    }, ( err ) => {

      Swal.fire({
        type: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });

    } );
  }

}
