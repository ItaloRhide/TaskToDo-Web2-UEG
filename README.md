# Task Todo App - Sistema de Gerenciamento de Tarefas

## Descrição
Aplicação web CRUD desenvolvida em Java com Spring Boot para o backend e Angular para o frontend. O sistema permite o gerenciamento de tarefas cotidianas, utilizando PostgreSQL como banco de dados.

## Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.5.4**
- **Spring Data JPA**
- **PostgreSQL 15**
- **PgAdmin4**
- **Docker & Docker Compose**
- **Maven**

### Frontend
- **Angular 18**
- **TypeScript**
- **Bootstrap 5**
- **Angular CLI**
- **Node.js**
- **NPM**

## Estrutura da Entidade Task

A entidade Task possui os seguintes atributos com tipos de dados distintos:

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| id | Long | Identificador único (auto-incremento) |
| titulo | String | Título da tarefa (máx. 100 caracteres) |
| descricao | String | Descrição detalhada (máx. 500 caracteres) |
| dataVencimento | LocalDate | Data de vencimento da tarefa |
| concluida | Boolean | Status de conclusão (true/false) |
| prioridade | Integer | Nível de prioridade (1-5) |
| dataCriacao | LocalDateTime | Data/hora de criação |
| dataAtualizacao | LocalDateTime | Data/hora da última atualização |

## Operações CRUD Disponíveis

### 1. **INCLUIR** - Criar nova tarefa
- **Endpoint:** `POST /api/tasks`
- **Descrição:** Cria uma nova tarefa no sistema

### 2. **LISTAR** - Buscar todas as tarefas
- **Endpoint:** `GET /api/tasks`
- **Descrição:** Retorna lista com todas as tarefas

### 3. **CONSULTAR** - Buscar tarefa por ID
- **Endpoint:** `GET /api/tasks/{id}`
- **Descrição:** Retorna uma tarefa específica pelo ID

### 4. **ALTERAR** - Atualizar tarefa existente
- **Endpoint:** `PUT /api/tasks/{id}`
- **Descrição:** Atualiza os dados de uma tarefa existente

### 5. **EXCLUIR** - Deletar tarefa
- **Endpoint:** `DELETE /api/tasks/{id}`
- **Descrição:** Remove uma tarefa do sistema

## Endpoints Adicionais

- `PUT /api/tasks/{id}/concluir` - Marcar tarefa como concluída
- `GET /api/tasks/status/{concluida}` - Buscar por status (true/false)
- `GET /api/tasks/prioridade/{prioridade}` - Buscar por prioridade (1-5)
- `GET /api/tasks/buscar?titulo={titulo}` - Buscar por título
- `GET /api/tasks/vencimento/hoje` - Tarefas que vencem hoje
- `GET /api/tasks/vencidas` - Tarefas vencidas
- `GET /api/tasks/pendentes` - Tarefas pendentes ordenadas por prioridade
- `GET /api/tasks/periodo?dataInicio={data}&dataFim={data}` - Buscar por período

## Como Executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Java 17 ou superior
- Maven 3.6 ou superior
- Node.js 18 ou superior
- Angular CLI 18 ou superior

### Passo 1: Iniciar o Banco de Dados (Backend)
```bash
# Navegar até o diretório do projeto
cd task-todo-app

# Iniciar PostgreSQL e PgAdmin4
docker-compose up -d
```

### Passo 2: Executar a Aplicação Spring Boot (Backend)
```bash
# Compilar o projeto
mvn clean compile

# Executar a aplicação
mvn spring-boot:run
```

### Passo 3: Executar a Aplicação Angular (Frontend)
```bash
# Navegar até o diretório do frontend
cd task-todo-frontend

# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
ng serve
```

### Passo 4: Acessar os Serviços

- **Frontend:** http://localhost:4200/
- **API REST:** http://localhost:8080/api/tasks
- **PgAdmin4:** http://localhost:8081
  - Email: admin@taskdodb.com
  - Senha: admin123

## Configuração do PgAdmin4

1. Acesse http://localhost:8081
2. Faça login com as credenciais acima
3. Adicione um novo servidor:
   - **Nome:** TaskToDB
   - **Host:** postgres (nome do container)
   - **Porta:** 5432
   - **Banco:** TASKDODB
   - **Usuário:** postgres
   - **Senha:** postgres

## Estrutura do Projeto

```
task-todo-app/
├── src/
│   ├── main/
│   │   ├── java/com/br/tasktodo/
│   │   │   ├── controller/
│   │   │   │   └── TaskController.java
│   │   │   ├── exception/
│   │   │   │   └── ResourceNotFoundException.java
│   │   │   ├── model/
│   │   │   │   └── Task.java
│   │   │   ├── repository/
│   │   │   │   └── TaskRepository.java
│   │   │   ├── service/
│   │   │   │   └── TaskService.java
│   │   │   └── TaskTodoApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── task-todo-frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── assets/
│   │   ├── index.html
│   │   └── main.ts
│   ├── angular.json
│   └── package.json
├── docker-compose.yml
├── init.sql
├── pom.xml
└── README.md
```

## Banco de Dados

O banco de dados **TASKDODB** será criado automaticamente quando o container PostgreSQL for iniciado. A tabela `tasks` será criada automaticamente pelo Hibernate na primeira execução da aplicação.

## Logs e Monitoramento

A aplicação está configurada para exibir logs detalhados do SQL executado pelo Hibernate, facilitando o debug e monitoramento das operações no banco de dados.