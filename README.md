# ✅ Task To-Do App

API REST para gerenciamento de tarefas e categorias usando **Spring
Boot + JPA + Angular + PostgreSQL**.

------------------------------------------------------------------------

## 📖 Sobre o Projeto

O **Task To-Do App** é uma aplicação backend desenvolvida em **Java
Spring Boot** que oferece uma API REST completa para gerenciar:

-   ✔️ Categorias\
-   ✔️ Tarefas\
-   ✔️ Fornecedores\
-   ✔️ Relacionamento entre Tarefas e Categorias\
-   ✔️ Relacionamento entre Tarefas e fornecedores\
-   ✔️ Regras de negócio isoladas em Services\
-   ✔️ Persistência usando Spring Data JPA\

Ela é ideal para estudos de CRUD, consumo por frontends (React, Angular,
Mobile) e práticas de arquitetura em camadas.

------------------------------------------------------------------------

## 🧩 Funcionalidades

### 🔹 Categorias

-   Criar\
-   Listar\
-   Atualizar\
-   Excluir\

### 🔹 Tarefas

-   Criar\
-   Listar\
-   Atualizar\
-   Excluir\
-   Marcar como concluída\
-   Vincular a uma categoria existente\
-   Vincular a um fornecedor existente\

### 🔹 Fornecedor

-   Criar\
-   Listar\
-   Atualizar\
-   Excluir\
-   Verificar atividades correlatas\

------------------------------------------------------------------------

## 📂 Estrutura do Back-end em releases

    src/
    ├── main/
    │   ├── java/com/br/tasktodo/
    │   │   ├── controller/   → Endpoints REST
    │   │   ├── service/      → Regras de negócio
    │   │   ├── repository/   → Acesso ao banco via JPA
    │   │   ├── model/        → Entidades (Task, Category, Fornecedor)
    │   │   └── TaskTodoApplication.java
    │   └── resources/
    │       ├── application.properties
    │       └── init.sql
    └── pom.xml

------------------------------------------------------------------------

## 🗃️ Entidades Principais

### **Category**

  Campo   Tipo     Descrição
  ------- -------- -------------------
  id      Long     Identificador
  name    String   Nome da categoria

------------------------------------------------------------------------

### **Task**

  Campo         Tipo       Descrição
  ------------- ---------- --------------------------
  id            Long       Identificador
  title         String     Título
  description   String     Descrição
  done          Boolean    Status
  category      Category   Relacionamento ManyToOne

------------------------------------------------------------------------

### **Fornecedor**

  Campo         Tipo       Descrição
  ------------- ---------- --------------------------
  id            Long       Identificador
  NOME          String     nome
  CNPJ          String     CNPJ

------------------------------------------------------------------------

## ▶️ Como Executar

### **Pré-requisitos**

-   Java **17+**
-   Maven **3.8+**

### **Rodando o projeto**

``` sh
mvn spring-boot:run
```

ou gerando o JAR:

``` sh
mvn clean package
java -jar target/task-to-do-app-0.0.1-SNAPSHOT.jar
```

O front-end entra em ação com:

para instalar as bibliotecas e dependências para o angular:
``` sh
npm install
```
para rodar o front:
``` sh
ng serve
```
------------------------------------------------------------------------

## 🗄️ Banco de Dados

O projeto usa **POSTGRESQL Database** por padrão.\

Configurações em:

    src/main/resources/application.properties

------------------------------------------------------------------------

## 🛠️ Tecnologias

-   Java 17\
-   Spring Boot\
-   Spring Web\
-   Spring Data JPA\
-   POSTGRESQL Database\
-   ANGULAR\
-   Maven\

------------------------------------------------------------------------

## 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos e de estudo.
