import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefas } from '../domains/tarefas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private readonly url = 'http://localhost:3000/tarefas';

  constructor(private http: HttpClient) {}

  public buscarTarefas(): Observable<Tarefas[]> {
    return this.http.get<Tarefas[]>(`${this.url}`);
  }

  public buscarTarefasPorId(id: number): Observable<Tarefas> {
    return this.http.get<Tarefas>(`${this.url}/${id}`);
  }

  public deletarTarefa(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
