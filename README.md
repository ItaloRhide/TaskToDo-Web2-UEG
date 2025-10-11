# 📝 Task To Do App

Sistema completo de gerenciamento de tarefas, com **backend em Java Spring Boot** e **frontend em Angular**, desenvolvido para organizar atividades diárias de forma simples e intuitiva.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend
- **Java 17**
- **Spring Boot 3.5.4**
- **Spring Data JPA**
- **PostgreSQL 15**
- **PgAdmin4**
- **Docker & Docker Compose**
- **Maven**

### 💻 Frontend
- **Angular 17**
- **TypeScript**
- **Bootstrap 5**
- **Bootstrap Icons**
- **RxJS**
- **Zone.js**

---

## 🧩 Estrutura da Entidade `Task`

| Campo | Tipo | Descrição |
|--------|------|-----------|
| id | Long | Identificador único |
| titulo | String | Título da tarefa |
| descricao | String | Descrição detalhada |
| dataVencimento | LocalDate | Data de vencimento |
| concluida | Boolean | Status da tarefa |
| prioridade | Integer | Nível de prioridade (1 a 5) |
| dataCriacao | LocalDateTime | Data de criação |
| dataAtualizacao | LocalDateTime | Data da última atualização |

---

## ⚙️ Funcionalidades do Sistema

### 🔹 Backend (API REST)
- Criar, listar, editar e excluir tarefas
- Buscar tarefas por título, prioridade ou status
- Marcar tarefas como concluídas
- Listar tarefas vencidas, do dia e pendentes
- Filtro por período personalizado

### 🔹 Frontend (Angular)
- Interface responsiva com **modo claro e escuro**
- CRUD completo com feedback visual
- Filtros por status, prioridade e vencimento
- Busca por título
- Separação em **páginas independentes**:
  - Lista de tarefas
  - Criar nova tarefa
  - Editar tarefa existente

---

## 📂 Estrutura do Projeto

```
task-todo-app/
├── backend/
│   ├── src/main/java/com/br/tasktodo/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── TaskTodoApplication.java
│   ├── src/main/resources/
│   ├── pom.xml
│   └── docker-compose.yml
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── task-list/
│   │   │   │   ├── task-form/
│   │   │   │   └── task-edit/
│   │   │   ├── services/
│   │   │   └── models/
│   │   ├── assets/
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
└── README.md
```

---

## ▶️ Como Executar o Projeto

### 🐳 Passo 1 – Subir o Banco de Dados

```bash
docker-compose up -d
```

Acesse:
- **PgAdmin:** http://localhost:8081  
  - Usuário: `admin@taskdodb.com`  
  - Senha: `admin123`

---

### ☕ Passo 2 – Rodar o Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

API disponível em:  
👉 **http://localhost:8080/api/tasks**

---

### 🌐 Passo 3 – Rodar o Frontend

```bash
cd frontend
npm install
ng serve
```

Aplicação Angular acessível em:  
👉 **http://localhost:4200**

---

## 🧠 Exemplos de Requisições (API REST)

**Criar uma tarefa**
```bash
POST /api/tasks
{
  "titulo": "Estudar Spring Boot",
  "descricao": "Revisar JPA e REST APIs",
  "dataVencimento": "2025-09-15",
  "prioridade": 4
}
```

**Atualizar tarefa**
```bash
PUT /api/tasks/1
{
  "titulo": "Atualizado",
  "descricao": "Com validações",
  "dataVencimento": "2025-09-20",
  "prioridade": 3,
  "concluida": false
}
```

**Excluir tarefa**
```bash
DELETE /api/tasks/1
```

---

## 💡 Recursos Extras
- 🌓 **Modo escuro e claro automático**
- 🔔 Mensagens de erro temporárias e com botão de fechar
- 📆 Filtros dinâmicos de tarefas
- 📱 Layout responsivo com Bootstrap

---

## 👨‍💻 Autor
**Desenvolvido por:** [Seu Nome Aqui]  
📧 *seu.email@exemplo.com*  
💼 *Projeto acadêmico / pessoal com fins educativos*
