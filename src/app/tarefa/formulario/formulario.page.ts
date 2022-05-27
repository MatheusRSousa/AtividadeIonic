import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TarefaService } from '../tarefa.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  tarefaForm: FormGroup;

  isModalOpen = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: TarefaService
  ) {}

  ngOnInit() {
    this.tarefaForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      dataCriacao: [''],
      dataConclusao: [''],
      prioridade: false,
      concluido: false,
    });
  }

  public formSubimit() {
    if (this.tarefaForm.valid) {
      this.service
        .addTarefa(this.tarefaForm.value)
        .then((res) => {
          this.tarefaForm.reset();
          this.router.navigate(['/home']);
        })
        .catch((error) => console.log(error));
    } else {
      return false;
    }
  }
}
