import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DadosComponent } from './dados/dados.component';
import { PrincipalComponent } from './principal/principal.component';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home',
    component: PrincipalComponent
  },
  {
    path: 'dados',
    component: DadosComponent
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./tarefa/tarefa.module').then( m => m.TarefaPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
