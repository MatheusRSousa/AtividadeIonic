import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuarios } from '../domains/usuarios';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss'],
})
export class DadosComponent implements OnInit {

  usuario: Usuarios;
  nomeUsuario: string = '';
  cpf: string;
  idade: string;
  endereco: string;
  foto: string;

  constructor(private menu: MenuController, private route: Router) { 
    this.usuario = JSON.parse(window.localStorage.getItem("usuario"));
    this.nomeUsuario = this.usuario.nome;
    this.cpf = this.usuario.cpf;
    this.idade = this.usuario.dataNascimento;
    this.endereco = this.usuario.endereco;
    this.foto = this.usuario.foto;
  }
  ngOnInit() {}

  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  voltarPaginaInicial(){
    this.route.navigate(['/home']);
  }

  sair(){
    
    this.route.navigate(['/login']);
    localStorage.clear();
  }

}
