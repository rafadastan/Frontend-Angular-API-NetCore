import { Component, OnInit } from '@angular/core';
import * as auth from '../utils/authenticationUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usuarioAutenticado = false;
  dadosUsuario = {
    id: '', nome: '', email: '', dataCriacao: ''
  }

  ngOnInit(): void {
    this.usuarioAutenticado = auth.isAuthenticated();
    if (this.usuarioAutenticado) {
      this.dadosUsuario = auth.getUserData();
    }
  }

  logout(): void {
    if (window.confirm('Deseja encerrar sua sessão?')) {
      auth.signOut();
      auth.redirectToLoginPage();
    }
  }

}