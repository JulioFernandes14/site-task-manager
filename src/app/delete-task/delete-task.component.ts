import { Component, Input } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

interface Task {
  id: number
  nome: string
  descricao: string
  dataCriacao: string
  status: string
}

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [ConfirmDialog, ToastModule, ButtonModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './delete-task.component.html',
  styleUrl: './delete-task.component.css'
})
export class DeleteTaskComponent {

  @Input() task: Task = {
    id: 0,
    nome: '',
    descricao: '',
    status: '',
    dataCriacao: ''
  };

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private requisicao: HttpClient) { }

  delete() {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a tarefa: ${this.task.nome}?`,
      header: 'Atenção!',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.requisicao.delete<void>(`http://localhost:8080/task-manager/delete/${this.task.id}`)
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso!', detail: 'Tarefa excluída' });
    
            this.task = {
              id: 0,
              nome: '',
              descricao: '',
              status: '',
              dataCriacao: ''
            };

            setTimeout(() => {
              window.location.reload()
            }, 1000);
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Erro!', detail: 'Erro na exclusão da tarefa' });
            console.error(err);
          }
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeitado!', detail: 'Exclusão de tarefa cancelada' });
      },
    });

  }
}
