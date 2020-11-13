import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { ConsultaEmpresaComponent } from './consulta-empresa/consulta-empresa.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { ConsultaFuncionarioComponent } from './consulta-funcionario/consulta-funcionario.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//importando as bibliotecas para desenvolvimento de formulários
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importando a biblioteca para requisições HTTP em APIs WEB
import { HttpClientModule } from '@angular/common/http';

//importando o módulo criado no arquivo 'app.module.ts'
import { AppRoutingModule } from './app.routing';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroEmpresaComponent,
    ConsultaEmpresaComponent,
    CadastroFuncionarioComponent,
    ConsultaFuncionarioComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    //registrando o mapeamento de rotas..
    AppRoutingModule,
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