//importando a biblioteca base do angular..
import { NgModule } from '@angular/core';

//importando as bibliotecas de rotas do angular
import { RouterModule, Routes } from '@angular/router';

//importando os componentes do projeto
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { ConsultaEmpresaComponent } from './consulta-empresa/consulta-empresa.component';
import { CadastroFuncionarioComponent } from './cadastro-funcionario/cadastro-funcionario.component';
import { ConsultaFuncionarioComponent } from './consulta-funcionario/consulta-funcionario.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';

//mapeamento das rotas do projeto..
//mapeamento das rotas (endereços de navegação) de cada componente
const appRoutes : Routes = [
    { path : 'cadastro-empresa', component : CadastroEmpresaComponent },
    { path : 'consulta-empresa', component : ConsultaEmpresaComponent },
    { path : 'cadastro-funcionario', component : CadastroFuncionarioComponent },
    { path : 'consulta-funcionario', component : ConsultaFuncionarioComponent },    
    { path : 'register', component : RegisterComponent },
    { path : 'admin', component : AdminComponent },
    { path : '', component : LoginComponent }
  ];

//registrando o mapeamento no angular..
@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})

export class AppRoutingModule { }