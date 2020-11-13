import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagemErro: string;

  errosEmail = [];
  errosSenha = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  //função para realizar a chamada para cadastro de usuário na API..
  autenticarUsuario(formLogin): void {

    this.errosEmail = [];
    this.errosSenha = [];

    //realizando uma chamada HTTP POST para a API..
    this.httpClient.post(environment.apiEndpoint + '/auth', formLogin.form.value)
      .subscribe( //recuperando o promisse da chamada..
        (data: any) => { //retorno de sucesso da API
          this.fecharAlertas();

          window.localStorage.setItem('usuario', JSON.stringify(data.usuario));
          window.localStorage.setItem('accessToken', JSON.stringify(data.accessToken));

          window.location.href = '/admin';
        },
        (e: any) => { //recuperando o promisse de erro..
          this.fecharAlertas();
          //verificar o status do erro obtido (400, 550, etc..)
          switch (e.status) {
            case 400:
              this.errosEmail = e.error.errors.Email;
              this.errosSenha = e.error.errors.Senha;
              break;
            case 500:
              this.mensagemErro = e.error.message;
              break;
          }
        }
      );

  }

  //função para fechar as mensagens de alerta
  fecharAlertas(): void {
    this.mensagemErro = "";
  }

}
