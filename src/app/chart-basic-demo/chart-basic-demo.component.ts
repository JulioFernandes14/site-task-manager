import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import * as ExcelJS from 'exceljs'
import { HttpClient } from '@angular/common/http';

interface Task {
  nome: string
  descricao: string
  dataCriacao: string
  status: string
}

interface countStatus {
  paralisada: number
  concluido: number
  pendente: number
  emProgresso: number
}

@Component({
  selector: 'chart-basic-demo',
  templateUrl: './chart-basic-demo.component.html',
  standalone: true,
  imports: [ChartModule, TableModule, CommonModule, TagModule],
  styleUrl: './chart-basic-demo.component.css'
})
export class ChartBasicDemo implements OnInit {
  basicData: any;
  basicOptions: any;
  page = 1
  dataTable: Array<Task> = []
  data: Array<Task[]> = []

  constructor(private requisicao: HttpClient) {}

  ngOnInit() {
    this.initChart();
    this.getDataTable()
    this.getChartValues()
  }

  getDataTable() {
    this.requisicao.get<Array<Task>>('http://localhost:8080/task-manager/list').subscribe(dados => {
      this.dataTable = dados;
      for (let i = 0; i < dados.length; i = i + 10) {
        this.data.push(dados.slice(i, i + 10));
      }
    })
  }

  getChartValues() {
    this.requisicao.get<countStatus>('http://localhost:8080/task-manager/status-count').subscribe(dados => {
      this.basicData = {
        labels: ['Concluídas', 'Em progresso', 'Pendentes', 'Paralisadas'],
        datasets: [
          {
            label: 'Relatório de tarefas',
            data: [dados.concluido, dados.emProgresso, dados.pendente, dados.paralisada],
            backgroundColor: ['#86efac','#5fd3fc','#fdba68','#fca5a5'],
            borderWidth: 1,
          },
        ],
      };
    })
  }

  limitarDescricao(texto: string, limite = 50) {
    if (texto.length > limite) {
      return texto.slice(0, limite - 3) + '...';
    }
    return texto;
  }

  initChart() {

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#fff',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ccc",
          },
          grid: {
            color: "#464746",
          },
          percentage:0.2,
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: "#ccc",
          },
          grid: {
            color: "#464746",
          },
        },
      },
      barPercentage:0.5,
    };

  }

  handleExport = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')

    const columnNames = ['Tarefa','Descrição','Data de Criação','Status']

    worksheet.addRow(columnNames)

    worksheet.getColumn(1).width = 30
    worksheet.getColumn(2).width = 100
    worksheet.getColumn(3).width = 30
    worksheet.getColumn(4).width = 30

    if (this.dataTable && this.dataTable.length > 0) {
      for (const task of this.dataTable) {

        const tarefa = task.nome;
        const descricao = task.descricao
        const dataCriacao = task.dataCriacao
        const status = task.status

        worksheet.addRow([tarefa, descricao, dataCriacao, status])

      }
    }

    const buffer = await workbook.xlsx.writeBuffer()

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    const date = new Date()
    a.download = `Tarefas ${date.getFullYear()}-${String(date.getMonth()).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`
    a.click()

    window.URL.revokeObjectURL(url)
  }

  nextPage() {
    if (this.page < this.data.length) {
      this.page++
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--
    }
  }
}