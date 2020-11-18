import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as http from '../../utils/httpUtils';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.css']
})
export class CadastroFuncionarioComponent implements OnInit {

  //atributos
  mensagemSucesso: string;
  mensagemErro: string;

  errosNome = [];
  errosSexo = [];
  errosDataNascimento = [];
  errosCpf = [];
  errosDataAdmissao = [];
  errosSituacao = [];
  errosEmpresaId = [];

  listagemEmpresas = [];

  //injeção de dependência
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.consultarEmpresas();
  }

  //função para executar a consulta na API e obter as empresas
  consultarEmpresas(): void {

    //executando uma requisição GET para a API..
    this.httpClient.get(environment.apiEndpoint + "/empresas",
      { headers: http.getHttpHeaders() })
      .subscribe(
        (data: any[]) => {
          //armazenando o resultado obtido no atributo
          this.listagemEmpresas = data;
        },
        (e: any) => {
          console.log(e);
        }
      )
  }

  cadastrarFuncionario(formCadastro): void {

    this.mensagemSucesso = "Processando, por favor aguarde.";

    this.errosNome = [];
    this.errosSexo = [];
    this.errosDataNascimento = [];
    this.errosCpf = [];
    this.errosDataAdmissao = [];
    this.errosSituacao = [];
    this.errosEmpresaId = [];

    //realizando uma chamada HTTP POST para a API..
    this.httpClient.post(environment.apiEndpoint + '/funcionarios', formCadastro.form.value,
      { headers: http.getHttpHeaders() })
      .subscribe( //recuperando o promisse da chamada..
        (data: any) => { //retorno de sucesso da API

          this.fecharMensagens();

          //exibir a mensagem de sucesso obtida da API
          this.mensagemSucesso = data.message;
          //limpar os campos do formulário
          formCadastro.form.reset();
        },
        (e: any) => { //recuperando o promisse de erro..

          this.fecharMensagens();
          console.log(e);
          //verificar o status do erro obtido (400, 550, etc..)
          switch (e.status) {
            case 400:

              this.errosNome = e.error.errors.Nome;
              this.errosSexo = e.error.errors.Sexo;
              this.errosDataNascimento = e.error.errors.DataNascimento;
              this.errosCpf = e.error.errors.Cpf;
              this.errosDataAdmissao = e.error.errors.DataAdmissao;
              this.errosSituacao = e.error.errors.Situacao;
              this.errosEmpresaId = e.error.errors.EmpresaId;
              break;

            case 500:

              this.mensagemErro = e.error.message;
              break;
          }
        }
      );
  }

  //função para fechar as mensagens
  fecharMensagens(): void {

    this.mensagemSucesso = "";
    this.mensagemErro = "";
  }

}
