# 📘 Sistema de Gerenciamento de Usuários - Frontend
## Projeto Acadêmico – API REST + Frontend

🖥️ Este repositório contém a implementação do **frontend** do sistema,
desenvolvido em **Angular**, responsável pela interface do usuário,
consumo da API REST e experiência de uso.

🔗 Backend disponível em:
https://github.com/AlessandroRodriguesdeOliveira/user-management-backend

Este projeto foi desenvolvido com o objetivo de aplicar conceitos relacionados ao __desenvolvimento de sistemas web, arquitetura REST, segurança, boas práticas de programação e integração entre frontend e backend__.

O sistema permite o __cadastro, consulta, atualização e exclusão de usuários__, utilizando tecnologias modernas amplamente adotadas no mercado.

## 🎯 Objetivos do Projeto

- Aplicar os conceitos de __API RESTful__

- Implementar __controle de acesso e autenticação__

- Utilizar __paginação e filtros__

- Padronizar respostas e tratamento de erros

- Integrar __frontend Angular__ com __backend Spring Boot__

- Simular um cenário real de aplicação corporativa

## 🛠 Tecnologias Utilizadas
### Backend

- Java 21

- Spring Boot 4.0.1

- Maven/Gradle

- Spring Security

- Spring Data JPA

- Hibernate

- PostgreSQL

- Keycloak

- Validation

- Spring Web

- Lombok

- Swagger / SpringDoc OpenAPI Starter WebMVC UI (Maven Repository)

- Docker e Docker Compose

### Frontend

- Angular 21

- Keycloak js

- Standalone Components

- Reactive Forms

- HttpClient

- Interceptors

- Angular Control Flow (@if, @for)

- TailwindCSS

## 🔐 Autenticação e Autorização

O sistema utiliza o __Keycloak__ como servidor de autenticação e autorização, seguindo o padrão __OAuth 2.0__ com tokens __JWT__.

- Usuários autenticados recebem um token

- O token é enviado automaticamente pelo frontend via interceptor

- O backend valida permissões com base em roles

- Apenas usuários com role ADMIN podem acessar determinadas rotas

## 📦 Funcionalidades Implementadas
### Usuários

- Cadastro de usuário

- Consulta por ID

- Listagem de usuários com paginação

- Atualização completa (PUT)

- Atualização parcial (PATCH)

- Exclusão de usuário

- Carregamento incremental (“carregar mais”)

## ⚠️ Tratamento de Erros

Foi implementado um __padrão unificado de erro__, garantindo respostas consistentes da API.

### Status HTTP utilizados:

- **400** – Dados inválidos

- **403** – Acesso negado

- **404** – Recurso não encontrado

- **409** – Conflito (dados duplicados)

- **500** – Erro interno do servidor

### Estrutura de erro:
```
{
  "status": 409,
  "error": "Conflict",
  "message": "Username already exists",
  "path": "/users/create",
  "timestamp": "2026-01-18T12:34:56"
}
```

No frontend, os erros são exibidos de forma clara ao usuário, permitindo melhor experiência de uso.

## ⚙️ Execução do Backend

O backend foi executado diretamente pela IDE (IntelliJ IDEA) durante o desenvolvimento,
permitindo melhor depuração, visualização de logs e produtividade acadêmica.

Os serviços de infraestrutura, como banco de dados e servidor de autenticação (Keycloak),
foram executados via Docker Compose, garantindo isolamento e padronização do ambiente.

1. Clone o repositório
2. Execute o comando:
   \`\`\`bash
   ./mvnw spring-boot:run
   \`\`\`

## 📄 Documentação da API

A API está documentada utilizando __Swagger (OpenAPI)__, permitindo a visualização e testes das rotas.

Após iniciar o backend:
```
http://localhost:8081/swagger-ui.html
```

## 🐳 Execução com Docker

O projeto utiliza __Docker Compose__ para facilitar a execução dos serviços.

**Pré-requisitos**

- Docker

- Docker Compose

__Inicialização__
```
docker-compose up -d
```


Serviços disponíveis:

- Keycloak: http://localhost:8080

- Banco de dados: PostgreSQL

## 🗄️ Banco de dados
Foi utilizado o PostgreSQL, mas está a vontade para usar um de sua preferência. 
Logo a baixo está minhas configurações:
- Nome do banco de dados: __testdb__
- User e password: __admin__

## Keycloak
Minhas configurações, modifique-as, porém, lembre de atualizar no código:
- realm -> user-management
- client -> users-api
- roles -> ADMIN, USER
- user -> user1

**OBS: as roles, são criadas na aba Client details e mapeadas ao user na tab Role Mapping**
**Na hora da criação do user você coloca um email e marca email verified e, em Credentials,** 
**seta uma senha (opcional)**

## 🖥️ Frontend Angular
__Execução__
```
npm install
```


A aplicação ficará disponível em:
```
http://localhost:4200
```

## 🧱 Arquitetura do Sistema

Separação em camadas:

- Controller

- Service

- Repository

- DTOs

- Uso de DTOs para evitar exposição direta das entidades

- Validações aplicadas na camada de serviço

- Exceções tratadas globalmente

- Comunicação desacoplada entre componentes no frontend

## 📚 Conceitos Aplicados

- Arquitetura REST

- Segurança com JWT

- Paginação de dados

- Programação reativa no frontend

- Boas práticas de código

- Separação de responsabilidades

- Tratamento centralizado de erros

## 👨‍🎓 Autor

### Alessandro Rodrigues de Oliveira
Projeto desenvolvido para fins acadêmicos, com foco em aprendizado prático e consolidação de conceitos de desenvolvimento web moderno.