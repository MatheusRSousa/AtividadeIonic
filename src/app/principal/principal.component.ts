import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Usuarios } from '../domains/usuarios';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

  usuario: Usuarios;
  nomeUsuario: string = '';

  constructor(private menu: MenuController) { 
    this.usuario = JSON.parse(window.localStorage.getItem("usuario"));
    console.log(this.usuario.nome);
    this.nomeUsuario = this.usuario.nome;
  }

  ngOnInit() {}

  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }
}
