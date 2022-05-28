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
  isModalOpen = true;
  nomeUsuario: string = '';

  constructor(
    private menu: MenuController,
    private route: Router,
    private alertCtrl: AlertController,
    private servico: TarefaService
  ) {
    this.nomeUsuario = JSON.parse(window.localStorage.getItem('usuario')).nome;
  }

  ngOnInit(): void {
    this.carregarTarefas();
    console.log(
      'nome usuario: ' + JSON.parse(window.localStorage.getItem('usuario')).nome
    );
  }

  carregarTarefas() {
    let tarefasAux = this.servico.getTarefas();
    tarefasAux.snapshotChanges().subscribe((res) => {
      this.tarefas = [];
      res.forEach((obj) => {
        let tarefa = obj.payload.toJSON();
        tarefa['$key'] = obj.key;
        this.tarefas.push(tarefa as Tarefas);

      });
    });
  }

  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }

  buscarTarefaPorId(id: number) {
    this.servico.buscarTarefasPorId(id).subscribe((tarefa: Tarefas) => {
      this.tarefa = tarefa;
    });
  }

  deleteTarefa(id: number) {
    this.deleteConfirm(id);
  }

  async deleteConfirm(id: number) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Deseja deletar essa tarefa?',
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
            this.servico.deletarTarefa(id);
            this.carregarTarefas();
            console.log('id ' + id);
          },
        },
      ],
    });

    await alert.present();
  }
}
