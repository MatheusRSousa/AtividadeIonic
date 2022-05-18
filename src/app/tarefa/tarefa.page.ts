import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TarefaService } from './tarefa.service';
import { Tarefas } from '../domains/tarefas';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.page.html',
  styleUrls: ['./tarefa.page.scss'],
})
export class TarefaPage implements OnInit {
  tarefas: Tarefas[] = [];
  tarefa: Tarefas = new Tarefas();

  constructor(
    private menu: MenuController,
    private route: Router,
    private alertCtrl: AlertController,
    private servico: TarefaService
  ) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.servico.buscarTarefas().subscribe((tarefas: Tarefas[]) => {
      this.tarefas = tarefas;
    });
  }

  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  voltarPaginaInicial() {
    this.route.navigate(['/home']);
  }

  sair() {
    this.presentAlertConfirm();
  }

  buscarTarefaPorId(id: number){
    this.servico.buscarTarefasPorId(id).subscribe((tarefa : Tarefas) =>{
      this.tarefa = tarefa;
    });
  }

  deleteTarefa(id: number){
    this.servico.deletarTarefa(id).subscribe(() =>{
      console.log("sucesso");
      this.carregarTarefas();
    },
      err => alert(err));
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
          handler: (blah) => {},
        },
        {
          text: 'Sim',
          id: 'confirm-button',
          handler: () => {
            this.route.navigate(['/login']);
            localStorage.clear();
          },
        },
      ],
    });

    await alert.present();
  }
}