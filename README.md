# 📌 Task To-Do App

API REST para gerenciamento de tarefas e categorias usando **Spring
Boot + JPA**.

# 🛡️ Badges

```{=html}
<p align="left">
```
`<img src="https://img.shields.io/badge/Java-17+-blue?logo=java" />`{=html}
`<img src="https://img.shields.io/badge/Spring_Boot-3.x-success?logo=springboot" />`{=html}
`<img src="https://img.shields.io/badge/Maven-Build-orange?logo=apachemaven" />`{=html}
`<img src="https://img.shields.io/badge/Status-Ativo-brightgreen" />`{=html}
`<img src="https://img.shields.io/badge/License-MIT-lightgrey" />`{=html}
```{=html}
</p>
```
# 📖 Sobre o Projeto

O **Task To-Do App** é um backend em **Java Spring Boot**, que oferece
uma API REST simples e robusta para gerenciamento de categorias e
tarefas.

# 🧩 Funcionalidades

## Categorias

-   Criar\
-   Listar\
-   Atualizar\
-   Excluir

## Tarefas

-   Criar\
-   Listar\
-   Atualizar\
-   Excluir\
-   Marcar como concluída\
-   Associar a uma categoria

# 📂 Estrutura do Projeto

    src/
    ├── main/
    │   ├── java/com/br/tasktodo/
    │   │   ├── controller/
    │   │   ├── service/
    │   │   ├── repository/
    │   │   ├── model/
    │   │   └── TaskTodoApplication.java
    │   └── resources/
    │       ├── application.properties
    │       └── init.sql
    └── pom.xml

# 🗃️ Entidades

## Category

  Campo   Tipo     Descrição
  ------- -------- ---------------
  id      Long     Identificador
  name    String   Nome

## Task

  Campo         Tipo       Descrição
  ------------- ---------- ---------------------
  id            Long       Identificador
  title         String     Título
  description   String     Descrição
  done          Boolean    Status
  category      Category   Categoria vinculada

# 🔗 Endpoints da API

## Categorias

  Método   Rota                 Descrição
  -------- -------------------- -------------
  GET      `/categories`        Lista todas
  POST     `/categories`        Cria nova
  PUT      `/categories/{id}`   Atualiza
  DELETE   `/categories/{id}`   Remove

## Tarefas

  Método   Rota            Descrição
  -------- --------------- -------------
  GET      `/tasks`        Lista todas
  POST     `/tasks`        Cria
  PUT      `/tasks/{id}`   Atualiza
  DELETE   `/tasks/{id}`   Remove

# ▶️ Como Executar

## Requisitos

-   Java 17+
-   Maven 3.8+

## Rodando

    mvn spring-boot:run

## Build

    mvn clean package
    java -jar target/task-to-do-app-0.0.1-SNAPSHOT.jar

# 🗄️ Banco de Dados

Usa **H2 Database** por padrão, configurado em `application.properties`.

# 🛠️ Tecnologias

-   Java 17\
-   Spring Boot 3\
-   Spring Web\
-   Spring Data JPA\
-   Maven\
-   H2

# 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos e estudos.
