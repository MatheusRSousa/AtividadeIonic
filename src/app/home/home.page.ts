import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { UsuarioLogin } from '../domains/usuarioLogin';
import { Usuarios } from '../domains/usuarios';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarios: UsuarioLogin[];
  username: string = '';
  password: string = '';

  constructor(
    private service: HomeService,
    private router: Router,
    private menu: MenuController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.menu.enable(false);

    this.service
      .getUsers()
      .snapshotChanges()
      .subscribe((res) => {
        this.usuarios = [];
        res.forEach((obj) => {
          this.usuarios.push(obj.payload.toJSON() as UsuarioLogin);
        });
      });
  }

  login() {
    let loginAprovado = false;
    localStorage.clear();

    this.usuarios.forEach((usuario) => {
      if (usuario.user == this.username && usuario.password == this.password) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        loginAprovado = true;
      }
    });

    if (loginAprovado) {
      this.router.navigate(['/home']);
      this.username = '';
      this.password = '';
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erro',
      message: 'Usuário ou senha incorreta.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
