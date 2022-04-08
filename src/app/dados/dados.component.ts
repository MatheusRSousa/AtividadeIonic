import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
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
  dataNascimento: Date;
  idade: string;
  endereco: string;
  foto: string;
  dataAtual = new Date();

  constructor(private menu: MenuController, private route: Router, private alertCtrl: AlertController) { 
  }

  ngOnInit() {
    this.usuario = JSON.parse(window.localStorage.getItem("usuario"));
    this.nomeUsuario = this.usuario.nome;
    this.cpf = this.usuario.cpf;
    this.endereco = this.usuario.endereco;
    this.foto = this.usuario.foto;
    this.dataNascimento = new Date(this.usuario.dataNascimento);
    this.transformarDataEmIdade(this.dataNascimento, this.dataAtual);
  }


  transformarDataEmIdade(dataNascimento: Date, dataAtual: Date){
      this.idade = (dataAtual.getFullYear() - dataNascimento.getFullYear()).toString();
      console.log(dataAtual.getFullYear());
      console.log(dataNascimento.getFullYear());
  }

  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  voltarPaginaInicial(){
    this.route.navigate(['/home']);
  }

  sair(){
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Sair',
      message: 'Deseja mesmo sair?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }, {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            this.route.navigate(['/login']);
            localStorage.clear();
          }
        }
      ]
    });

    await alert.present();
  }

}
