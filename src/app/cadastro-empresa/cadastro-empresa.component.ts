import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as http from '../../utils/httpUtils';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {

  //atributos
  mensagemSucesso:string;
  mensagemErro:string;

  errosRazaoSocial = [];
  errosNomeFantasia = [];
  errosCnpj = [];

  //injeção de dependência
  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  //função para executar o evento SUBMIT do formulário
  cadastrarEmpresa(formCadastro) : void {

    this.mensagemSucesso = "Processando, por favor aguarde.";

    this.errosNomeFantasia = [];
    this.errosRazaoSocial = [];
    this.errosCnpj = [];
    
    //realizando uma chamada HTTP POST para a API..
    this.httpClient.post(environment.apiEndpoint + '/empresas', formCadastro.form.value, 
      { headers : http.getHttpHeaders() })
      .subscribe( //recuperando o promisse da chamada..
        (data:any) => { //retorno de sucesso da API

          this.fecharMensagens();

          //exibir a mensagem de sucesso obtida da API
          this.mensagemSucesso = data.message;
          //limpar os campos do formulário
          formCadastro.form.reset();
        },
        (e:any) => { //recuperando o promisse de erro..
          
          this.fecharMensagens();

          //verificar o status do erro obtido (400, 550, etc..)
          switch(e.status)
          {
            case 400:
              
              this.errosNomeFantasia = e.error.errors.NomeFantasia;
              this.errosRazaoSocial = e.error.errors.RazaoSocial;
              this.errosCnpj = e.error.errors.Cnpj;
              break;

            case 500:
              
              this.mensagemErro = e.error.message;
              break;
          }
        }
      );
  }

  //função para fechar as mensagens
  fecharMensagens() : void {

    this.mensagemSucesso = "";
    this.mensagemErro = "";
  }
}