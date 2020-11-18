import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as http from '../../utils/httpUtils';

@Component({
  selector: 'app-consulta-funcionario',
  templateUrl: './consulta-funcionario.component.html',
  styleUrls: ['./consulta-funcionario.component.css']
})
export class ConsultaFuncionarioComponent implements OnInit {

//atributos
listagemFuncionarios = []; //array vazio..

//declarando e inicializando o httpClient
constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.consultarFuncionarios();
  }

  //função para executar a consulta na API e obter os funcionários
  consultarFuncionarios(): void {

    //executando uma requisição GET para a API..
    this.httpClient.get(environment.apiEndpoint + "/funcionarios",
      { headers: http.getHttpHeaders() })
      .subscribe(
        (data: any[]) => {
          //armazenando o resultado obtido no atributo
          this.listagemFuncionarios = data;
        },
        (e: any) => {
          console.log(e);
        }
      )
  }
}