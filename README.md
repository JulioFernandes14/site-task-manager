# Task Manager

O **Task Manager** é um gerenciador de tarefas desenvolvido com Angular, onde você pode organizar suas tarefas do dia a dia, acompanhar o status de cada uma e exportar sua lista para um arquivo `.xsl`. Também é possível visualizar um gráfico com a quantidade de tarefas em cada status.

## Funcionalidades

- Adicionar tarefas
- Editar tarefas
- Mover tarefas entre status
- Deletar tarefas
- Exportar tarefas para `.xsl`
- Visualizar gráfico de tarefas por status

## Tecnologias Utilizadas

- [Angular](https://angular.io/)
- [PrimeNG](https://www.primefaces.org/primeng/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- MySQL

## Como executar o projeto

### Frontend

1. Clone este repositório:
   ```bash
   git clone https://github.com/JulioFernandes14/site-task-manager.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd site-task-manager
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Rode o projeto:
   ```bash
   ng serve --open
   ```

> ⚠️ O backend deve estar rodando simultaneamente.

---

### Backend

1. Clone o repositório do backend:
   ```bash
   git clone https://github.com/JulioFernandes14/task-manager-api
   ```
2. Importe o projeto no Spring Tool Suite.
3. Execute a aplicação.

#### Configuração do banco de dados

- Banco: MySQL  
- Usuário: `root` *(ou seu usuário MySQL)*  
- Senha: `root1` *(ou a senha correspondente ao seu usuário MySQL)*  
- Nome do banco: `bancoclientes` (criado automaticamente pelo Spring Boot)

> ✅ As tabelas e o banco de dados são criados automaticamente na primeira execução, sem necessidade de scripts manuais.

---

Pronto! Agora o Task Manager estará funcionando localmente.
