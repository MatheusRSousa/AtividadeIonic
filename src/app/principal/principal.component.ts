import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Usuarios } from '../domains/usuarios';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

  usuario: Usuarios;
  nomeUsuario: string = '';

  constructor(private menu: MenuController, private route: Router, private alertCtrl: AlertController) { 
    this.usuario = JSON.parse(window.localStorage.getItem("usuario"));
    this.nomeUsuario = this.usuario.nome;
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
    this.presentAlertConfirm();
    
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
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
