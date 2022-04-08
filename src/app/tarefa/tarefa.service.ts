import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tarefas } from '../domains/tarefas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  endpoint = 'http://localhost:3000/tarefas';

  constructor(public http: HttpClient) {}

  public login(username: string, senha: string): Observable<Tarefas[]> {
    return this.http.get<Tarefas[]>(
      `${this.endpoint}?usuarios=${username}&senha=${senha}`
    );
  }
}
