# ✅ Task To-Do App

API REST para gerenciamento de tarefas e categorias usando **Spring
Boot + JPA**.

------------------------------------------------------------------------

## 📖 Sobre o Projeto

O **Task To-Do App** é uma aplicação backend desenvolvida em **Java
Spring Boot** que oferece uma API REST completa para gerenciar:

-   ✔️ Categorias\
-   ✔️ Tarefas\
-   ✔️ Relacionamento entre Tarefas e Categorias\
-   ✔️ Regras de negócio isoladas em Services\
-   ✔️ Persistência usando Spring Data JPA

Ela é ideal para estudos de CRUD, consumo por frontends (React, Angular,
Mobile) e práticas de arquitetura em camadas.

------------------------------------------------------------------------

## 🧩 Funcionalidades

### 🔹 Categorias

-   Criar
-   Listar
-   Atualizar
-   Excluir

### 🔹 Tarefas

-   Criar
-   Listar
-   Atualizar
-   Excluir
-   Marcar como concluída
-   Vincular a uma categoria existente

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    src/
    ├── main/
    │   ├── java/com/br/tasktodo/
    │   │   ├── controller/   → Endpoints REST
    │   │   ├── service/      → Regras de negócio
    │   │   ├── repository/   → Acesso ao banco via JPA
    │   │   ├── model/        → Entidades (Task, Category)
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

## 🔗 Endpoints da API

### 📌 **Categorias**

  Método   Rota                 Descrição
  -------- -------------------- -------------
  GET      `/categories`        Lista todas
  POST     `/categories`        Cria nova
  PUT      `/categories/{id}`   Atualiza
  DELETE   `/categories/{id}`   Remove

------------------------------------------------------------------------

### 📌 **Tarefas**

  Método   Rota            Descrição
  -------- --------------- -------------
  GET      `/tasks`        Lista todas
  POST     `/tasks`        Cria nova
  PUT      `/tasks/{id}`   Atualiza
  DELETE   `/tasks/{id}`   Remove

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

------------------------------------------------------------------------

## 🗄️ Banco de Dados

O projeto usa **H2 Database** por padrão.

Configurações em:

    src/main/resources/application.properties

Um arquivo `init.sql` acompanha o projeto para inicialização de dados.

------------------------------------------------------------------------

## 🛠️ Tecnologias

-   Java 17\
-   Spring Boot\
-   Spring Web\
-   Spring Data JPA\
-   H2 Database\
-   Maven

------------------------------------------------------------------------

## 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos e de estudo.\
