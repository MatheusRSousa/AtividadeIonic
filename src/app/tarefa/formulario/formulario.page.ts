import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  titulo: string;
  descricao: string;
  dataConclusao: string;
  prioridade: string;

  constructor(
    private menu: MenuController,
    private route: Router, 
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }


  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }



}
