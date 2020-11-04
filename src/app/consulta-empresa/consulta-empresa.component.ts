import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-consulta-empresa',
  templateUrl: './consulta-empresa.component.html',
  styleUrls: ['./consulta-empresa.component.css']
})
export class ConsultaEmpresaComponent implements OnInit {

  //atributos
  listagemEmpresas = []; //array vazio..
  empresaEdicao = { id: '', nomeFantasia: '' };

  errosNomeFantasia = []; //erros de validação

  mensagemSucessoExclusao: string;
  mensagemSucessoEdicao: string;

  //declarando e inicializando o httpClient
  constructor(private httpClient: HttpClient) { }

  //método executado executado sempre que o componente é carregado
  ngOnInit(): void {
    this.consultarEmpresas();
  }

  //função para executar a consulta na API e obter as empresas
  consultarEmpresas(): void {

    //executando uma requisição GET para a API..
    this.httpClient.get(environment.apiEndpoint + "/empresas")
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

  //função para realizar a excusão da empresa
  excluirEmpresa(id): void {

    if (window.confirm('Deseja realmente excluir a empresa selecionada?')) {
      //requisição de exclusão para a API..
      this.httpClient.delete(environment.apiEndpoint + "/empresas/" + id)
        .subscribe(
          (data: any) => {
            //capturando a mensagem de sucesso retornada pela API..
            this.mensagemSucessoExclusao = data.message;
            //executar a consulta de empresas..
            this.consultarEmpresas();
          },
          (e: any) => {
            console.log(e);
          }
        );
    }

  }

  //função para obter 1 empresa pelo id
  obterEmpresa(id): void {

    this.fecharMensagens();
    this.errosNomeFantasia = [];

    //requisição na API para consultar 1 empresa baseado no id
    this.httpClient.get(environment.apiEndpoint + "/empresas/" + id)
      .subscribe(
        (data: any) => {
          this.empresaEdicao = data;
        },
        (e: any) => {
          console.log(e);
        }
      )
  }

  //função para atualizar os dados da empresa
  atualizarEmpresa(formEdicao): void {

    this.mensagemSucessoEdicao = "Processando, por favor aguarde.";

    this.errosNomeFantasia = [];

    //realizando uma chamada HTTP POST para a API..
    this.httpClient.put(environment.apiEndpoint + '/empresas', formEdicao.form.value)
      .subscribe( //recuperando o promisse da chamada..
        (data: any) => { //retorno de sucesso da API

          this.fecharMensagens();

          //exibir a mensagem de sucesso obtida da API
          this.mensagemSucessoEdicao = data.message;
          //executar novamente a consulta
          this.consultarEmpresas();
        },
        (e: any) => { //recuperando o promisse de erro..

          this.fecharMensagens();

          //verificar o status do erro obtido (400, 550, etc..)
          switch (e.status) {
            case 400:

              this.errosNomeFantasia = e.error.errors.NomeFantasia;
              break;
          }
        }
      );

  }

  //função para fechar as mensagens
  fecharMensagens(): void {
    this.mensagemSucessoExclusao = "";
    this.mensagemSucessoEdicao = "";
  }

}