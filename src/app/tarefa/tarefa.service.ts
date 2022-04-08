import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefas } from '../domains/tarefas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  url = 'http://localhost:3000/tarefas';

  constructor(public http: HttpClient) {}

  public buscarTarefas(): Observable<Tarefas[]> {
    return this.http.get<Tarefas[]>(`${this.url}`);
  }

  public buscarTarefasPorId(id: number): Observable<Tarefas> {
    return this.http.get<Tarefas>(`${this.url}/${id}`);
  }
}
