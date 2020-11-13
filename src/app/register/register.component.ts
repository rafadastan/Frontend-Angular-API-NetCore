import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mensagemSucesso: string;
  mensagemErro: string;

  errosNome = [];
  errosEmail = [];
  errosSenha = [];
  errosSenhaConfirmacao = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  //função para realizar a chamada para cadastro de usuário na API..
  cadastrarUsuario(formRegister): void {

    this.mensagemSucesso = "Processando requisição...";

    this.errosNome = [];
    this.errosEmail = [];
    this.errosSenha = [];
    this.errosSenhaConfirmacao = [];

    //realizando uma chamada HTTP POST para a API..
    this.httpClient.post(environment.apiEndpoint + '/usuarios', formRegister.form.value)
      .subscribe( //recuperando o promisse da chamada..
        (data: any) => { //retorno de sucesso da API
          this.fecharAlertas();
          //exibir a mensagem de sucesso obtida da API
          this.mensagemSucesso = data.message;
          //limpar os campos do formulário
          formRegister.form.reset();
        },
        (e: any) => { //recuperando o promisse de erro..
          this.fecharAlertas();
          //verificar o status do erro obtido (400, 550, etc..)
          switch (e.status) {   
            case 400:
              
              this.errosNome = e.error.errors.Nome;
              this.errosEmail = e.error.errors.Email;
              this.errosSenha = e.error.errors.Senha;
              this.errosSenhaConfirmacao = e.error.errors.SenhaConfirmacao;

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
    this.mensagemSucesso = "";
    this.mensagemErro = "";
  }
}