import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuarios } from '../domains/usuarios';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarios: Array<Usuarios>;
  username: string = '';
  password: string = '';

  service: HomeService;

  constructor(service: HomeService, private router: Router, private menu: MenuController) {
    this.service = service;
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  login(){
    localStorage.clear();
    
    this.service.login(this.username, this.password).subscribe((usuario: Usuarios[]) => {
      this.usuarios = usuario;
      if(this.usuarios.length > 0){
        localStorage.setItem("usuario", JSON.stringify(usuario[0]));
        this.router.navigate(['/home']);
        this.username = '';
        this.password = '';
      }
      console.log(this.usuarios);
      console.log(localStorage);
    },
    err=> alert(err))
  }


}
