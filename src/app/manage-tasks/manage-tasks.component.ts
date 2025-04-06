import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MeterGroup } from 'primeng/metergroup';
import { TagModule } from 'primeng/tag';
import { CreateTaskComponent } from "../create-task/create-task.component";
import { EditTaskComponent } from "../edit-task/edit-task.component";

interface Task {
  id:number
  nome:string
  descricao:string
  dataCriacao:string
  status:string
}

interface countStatus {
  paralisada: number
  concluido: number
  pendente: number
  emProgresso: number
}

@Component({
  selector: 'app-manage-tasks',
  imports: [MeterGroup, TagModule, CreateTaskComponent, CreateTaskComponent, EditTaskComponent],
  templateUrl: './manage-tasks.component.html',
  styleUrl: './manage-tasks.component.css'
})
export class ManageTasksComponent {
  barValues: Array<any> = [];
    // { label: 'Pendente', color: '#fbbf24', value: 50 },
    // { label: 'Em progresso', color: '#60a5fa', value: 20 },
    // { label: 'Concluídas', color: 'green', value: 20 },

  dataTablePagination: Array<Task[]> = [];
  page: number = 1;

  constructor(private requisicao: HttpClient) {}

  ngOnInit() {
    this.getDataTable()
    this.getBarValues()
  }

  getDataTable() {
    this.requisicao.get<Array<Task>>('http://localhost:8080/task-manager/list').subscribe(dados => {
      for (let i = 0; i < dados.length; i = i + 10) {
        dados.reverse()
        this.dataTablePagination.push(dados.slice(i, i + 10));
      }
    })
  }

  getBarValues() {
    this.requisicao.get<countStatus>('http://localhost:8080/task-manager/status-count').subscribe(dados => {
      const total = dados.concluido + dados.emProgresso + dados.paralisada + dados.pendente
      this.barValues = [
        { label: 'Pendente', color: '#fbbf24', value: (dados.pendente / total) * 100 },
        { label: 'Em progresso', color: '#60a5fa', value: (dados.emProgresso / total) * 100  },
        { label: 'Concluídas', color: 'green', value: (dados.concluido / total) * 100  }
      ]
    })
  }

  limitarDescricao(texto: string, limite = 50) {
    if (texto.length > limite) {
      return texto.slice(0, limite - 3) + '...';
    }
    return texto;
  }

  nextPage() {
    if (this.page < this.dataTablePagination.length) {
      this.page++
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--
    }
  }

}
