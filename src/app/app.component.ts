import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usuarioAutenticado = false;
  accessToken = {
    bearerToken : ''
  }

  ngOnInit(): void {
    
    //verificar se existe um token de acesso na localstorage
    this.accessToken = JSON.parse(window.localStorage.getItem('accessToken'));
    this.usuarioAutenticado = this.accessToken.bearerToken != "";

  }

  logout() : void {
    if(window.confirm('Deseja encerrar sua sessão?')){
      window.localStorage.removeItem('usuario');
      window.localStorage.removeItem('accessToken');

      window.location.href = "/";
    }
  }

}
