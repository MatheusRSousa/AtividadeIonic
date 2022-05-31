import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefas } from '../domains/tarefas';
import { Observable } from 'rxjs';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  ideaListRef: AngularFireList<any>;
  ideaRef: AngularFireObject<any>;

  constructor( private db: AngularFireDatabase) {}

  public getTarefas() {
    return this.db.list('/tarefa');
  }

  public addTarefa(obj: Tarefas) {
    return this.db.list('/tarefa').push({
      titulo: obj.titulo,
      descricao: obj.descricao,
      dataCriacao: obj.dataCriacao,
      dataConclusao: obj.dataConclusao,
      prioridade: obj.prioridade,
      concluido: obj.concluido,
    });
  }

  public buscarTarefaPorId(id: number) {
    return this.ideaRef = this.db.object("/tarefa/"+id);
  }

  public alterarTarefa(id: number, obj: Tarefas){
    this.ideaRef = this.db.object('/tarefa/'+id);
    return this.ideaRef.update({
      titulo: obj.titulo,
      descricao: obj.descricao,
      dataCriacao: obj.dataCriacao,
      dataConclusao: obj.dataConclusao,
      prioridade: obj.prioridade,
      concluido: obj.concluido,
    });
  }

  public deletarTarefa(id: number){
    this.ideaRef = this.db.object('/tarefa/'+id);
    this.ideaRef.remove();

    //return this.http.delete<void>(`${this.url}/${id}`);
  }
}
