import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../domains/usuarios';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  endpoint = 'http://localhost:3000/login';

  constructor(public http: HttpClient) {}

  public login(username: string, senha: string): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(`${this.endpoint}?usuarios=${username}&senha=${senha}`
    );
  }
}
