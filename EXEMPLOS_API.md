# Exemplos de Uso da API Task Todo

## Testando as 5 Operações CRUD

### 1. INCLUIR - Criar nova tarefa
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar Spring Boot",
    "descricao": "Revisar conceitos de JPA e REST APIs",
    "dataVencimento": "2025-09-15",
    "prioridade": 4
  }'
```

**Resposta esperada:**
```json
{
  "id": 1,
  "titulo": "Estudar Spring Boot",
  "descricao": "Revisar conceitos de JPA e REST APIs",
  "dataVencimento": "2025-09-15",
  "concluida": false,
  "prioridade": 4,
  "dataCriacao": "2025-09-10T18:10:21.601555",
  "dataAtualizacao": "2025-09-10T18:10:21.601563"
}
```

### 2. LISTAR - Buscar todas as tarefas
```bash
curl -X GET http://localhost:8080/api/tasks
```

### 3. CONSULTAR - Buscar tarefa por ID
```bash
curl -X GET http://localhost:8080/api/tasks/1
```

### 4. ALTERAR - Atualizar tarefa existente
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Estudar Spring Boot - Atualizado",
    "descricao": "Revisar conceitos de JPA, REST APIs e Validações",
    "dataVencimento": "2025-09-20",
    "prioridade": 5,
    "concluida": false
  }'
```

### 5. EXCLUIR - Deletar tarefa
```bash
curl -X DELETE http://localhost:8080/api/tasks/1
```

**Resposta esperada:**
```json
{
  "message": "Tarefa excluída com sucesso"
}
```

## Endpoints Adicionais

### Marcar tarefa como concluída
```bash
curl -X PUT http://localhost:8080/api/tasks/1/concluir
```

### Buscar tarefas por status
```bash
# Tarefas concluídas
curl -X GET http://localhost:8080/api/tasks/status/true

# Tarefas pendentes
curl -X GET http://localhost:8080/api/tasks/status/false
```

### Buscar tarefas por prioridade
```bash
curl -X GET http://localhost:8080/api/tasks/prioridade/5
```

### Buscar tarefas por título
```bash
curl -X GET "http://localhost:8080/api/tasks/buscar?titulo=Spring"
```

### Buscar tarefas que vencem hoje
```bash
curl -X GET http://localhost:8080/api/tasks/vencimento/hoje
```

### Buscar tarefas vencidas
```bash
curl -X GET http://localhost:8080/api/tasks/vencidas
```

### Buscar tarefas pendentes ordenadas por prioridade
```bash
curl -X GET http://localhost:8080/api/tasks/pendentes
```

### Buscar tarefas por período
```bash
curl -X GET "http://localhost:8080/api/tasks/periodo?dataInicio=2025-09-01&dataFim=2025-09-30"
```

## Exemplos de Dados para Teste

### Criar múltiplas tarefas para teste
```bash
# Tarefa 1 - Alta prioridade
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Reunião com cliente",
    "descricao": "Apresentar proposta do projeto",
    "dataVencimento": "2025-09-11",
    "prioridade": 5
  }'

# Tarefa 2 - Média prioridade
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Revisar código",
    "descricao": "Code review do módulo de autenticação",
    "dataVencimento": "2025-09-12",
    "prioridade": 3
  }'

# Tarefa 3 - Baixa prioridade
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Organizar documentos",
    "descricao": "Arquivar documentos do projeto anterior",
    "dataVencimento": "2025-09-20",
    "prioridade": 1
  }'
```

## Validações e Tratamento de Erros

### Erro de validação - Título obrigatório
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "descricao": "Tarefa sem título",
    "dataVencimento": "2025-09-15",
    "prioridade": 3
  }'
```

### Erro de validação - Prioridade inválida
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Tarefa com prioridade inválida",
    "dataVencimento": "2025-09-15",
    "prioridade": 10
  }'
```

### Erro 404 - Tarefa não encontrada
```bash
curl -X GET http://localhost:8080/api/tasks/999
```

