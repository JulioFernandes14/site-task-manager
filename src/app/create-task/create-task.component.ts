import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

interface NewTask {
  nome: string
  descricao: string
  dataCriacao: string
  status: string
}

@Component({
  selector: 'app-create-task',
  imports: [Dialog, ButtonModule, InputTextModule, TextareaModule, FormsModule, Toast],
  providers: [MessageService],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {

  newTask: NewTask = {
    nome: "",
    descricao: "",
    dataCriacao: "",
    status: "Pendente"
  }

  visible: boolean = false;

  constructor(private requisicao: HttpClient, private messageService: MessageService){}

  ngOnInit() {
    const date = new Date()

    this.newTask.dataCriacao = `${date.getFullYear()}-${String(date.getMonth()).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
  }

  showDialog() {
    this.visible = true;
  }

  createTask() {
    this.requisicao.post<NewTask>('http://localhost:8080/task-manager/create', this.newTask).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Tarefa criada' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao criar a tarefa: ${err.error?.message || err.message || 'Erro desconhecido'}` });
      }
    });

    this.newTask.nome = ''
    this.newTask.descricao = ''

    this.visible = false;

    setTimeout(() => {
      window.location.reload()
    },1000)
  }

}
