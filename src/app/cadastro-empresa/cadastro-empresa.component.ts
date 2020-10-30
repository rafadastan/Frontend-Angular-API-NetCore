import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  //função para executar o evento SUBMIT do formulário
  cadastrarEmpresa(formCadastro) : void {
    
    //realizando uma chamada HTTP POST para a API..
    this.httpClient.post(environment.apiEndpoint + '/empresas', formCadastro.form.value)
      .subscribe( //recuperando o promisse da chamada..
        (data:any) => { //retorno de sucesso da API
          console.log(data);
        },
        (e:any) => { //recuperando o promisse de erro..
          console.log(e);
        }
      );
  }
}
