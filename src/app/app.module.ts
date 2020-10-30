import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { ConsultaEmpresaComponent } from './consulta-empresa/consulta-empresa.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { ConsultaFuncionarioComponent } from './consulta-funcionario/consulta-funcionario.component';

//importando as bibliotecas para desenvolvimento de formulários
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importando a biblioteca para requisições HTTP em APIs WEB
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

//mapeamento das rotas (endereços de navegação) de cada componente
const appRoutes : Routes = [
  { path : 'cadastro-empresa', component : CadastroEmpresaComponent },
  { path : 'consulta-empresa', component : ConsultaEmpresaComponent },
  { path : 'cadastro-funcionario', component : CadastroFuncionarioComponent },
  { path : 'consulta-funcionario', component : ConsultaFuncionarioComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroEmpresaComponent,
    ConsultaEmpresaComponent,
    CadastroFuncionarioComponent,
    ConsultaFuncionarioComponent
  ],
  imports: [
    BrowserModule,
    //registrando o mapeamento de rotas..
    RouterModule.forRoot(appRoutes),
    //registrando as bibliotecas para formulário
    FormsModule,
    ReactiveFormsModule,
    //registrando a biblioteca para acesso em APIs
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }