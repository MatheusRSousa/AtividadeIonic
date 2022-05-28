import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  tarefaForm: FormGroup;
  isModalOpen = false;
  dataAtual: Date;
  timeElapsed = Date.now();

  constructor(
    private menu: MenuController,
    private router: Router,
    private fb: FormBuilder,
    private service: TarefaService
  ) {}

  ngOnInit() {
    this.dataAtual = new Date(this.timeElapsed);
    this.tarefaForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      dataCriacao: [this.dataAtual.toLocaleDateString()],
      dataConclusao: [''],
      prioridade: false,
      concluido: false,
    });
  }


  openFirst() {
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
  }



  public formSubimit() {
    if (this.tarefaForm.valid) {
      this.service
        .addTarefa(this.tarefaForm.value)
        .then((res) => {
          this.tarefaForm.reset();
          this.router.navigate(['/tarefas']);
        })
        .catch((error) => console.log(error));
    } else {
      return false;
    }
  }
}
