import { Component, Input } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';
import { Toast } from 'primeng/toast';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

interface Task {
  id: number
  nome:string
  descricao:string
  status:string
  dataCriacao:string
}

@Component({
  selector: 'app-edit-task',
  imports: [Dialog, ButtonModule, InputTextModule, TextareaModule, FormsModule, Toast],
  providers: [MessageService],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {

  @Input() task: Task = {
    id:0,
    nome:'',
    descricao:'',
    status:'',
    dataCriacao:''
  }
  
  visible: boolean = false;

  constructor(private requisicao: HttpClient, private messageService: MessageService) {}

  showDialog() {
    this.visible = true;
  }

  updateTask() {
    this.requisicao.put<Task>('http://localhost:8080/task-manager/update', this.task).subscribe({
      next: (response: any) => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Tarefa criada' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: `Erro ao criar a tarefa: ${err.error?.message || err.message || 'Erro desconhecido'}` });
      }
    });

    this.visible = false;

    setTimeout(() => {
      window.location.reload()
    },1000)

    this.task = {
      id:0,
      nome:'',
      descricao:'',
      status:'',
      dataCriacao:''
    }
  }

}
