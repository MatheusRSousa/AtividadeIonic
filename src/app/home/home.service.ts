import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../domains/usuarios';
import { UsuarioLogin } from '../domains/usuarioLogin';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  ideaListRef: AngularFireList<any>;
  ideaRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  getUsers() {
    return this.db.list('/login');
  }
}
