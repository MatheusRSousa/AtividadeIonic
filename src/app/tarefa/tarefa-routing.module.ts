import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarefaPage } from './tarefa.page';

const routes: Routes = [
  {
    path: '',
    component: TarefaPage
  },
  {
    path: 'formulario',
    loadChildren: () => import('./formulario/formulario.module').then( m => m.FormularioPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefaPageRoutingModule {}
