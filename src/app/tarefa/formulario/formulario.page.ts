import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TarefaService } from '../tarefa.service';
import { Tarefas } from 'src/app/domains/tarefas';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  tarefaForm: FormGroup;
  tarefa = new Tarefas();
  isModalOpen = false;
  dataAtual: Date;
  timeElapsed = Date.now();
  edicao = false;
  id: number;

  constructor(
    private menu: MenuController,
    private router: Router,
    private fb: FormBuilder,
    private service: TarefaService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    
    this.route.params.subscribe(params =>{
      if (params.id){
        this.id = params.id;
        this.edicao = true;
        this.buscarTarefa(params.id);
      }
    })

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

  buscarTarefa(id: number) {
    this.service.buscarTarefaPorId(id).valueChanges().subscribe(res => {
      this.tarefaForm.setValue(res);
    });
  }

  public formSubimit() {
    if (this.tarefaForm.valid) {
      if(this.edicao){
        this.service
        .alterarTarefa(this.id, this.tarefaForm.value)
        .then((res) => {
          this.tarefaForm.reset();
          this.router.navigate(['/tarefas']);
        })
        .catch((error) => console.log(error));
      } else{
        this.service
          .addTarefa(this.tarefaForm.value)
          .then((res) => {
            this.tarefaForm.reset();
            this.router.navigate(['/tarefas']);
          })
          .catch((error) => console.log(error));
      }
    } else {
      return false;
    }
  }
}
