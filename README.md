# 🥩 Delicias Bovinas — Ecommerce
 
## 📌 Visão Geral
Delicias Bovinas é uma aplicação fullstack dedicada a gastronomia baseada em carnes bovinas. A plataforma oferece uma seleção curada de cortes nobres além de ferramentas para gestão de produtos, usuários, controle de inventário e pedidos online.

O projeto foi desenvolvido com uma arquitetura moderna, escalável e bem organizada, separando claramente responsabilidades entre domínio, aplicação, infraestrutura e APIs.

## 🚀 Executando o Projeto
Siga os passos abaixo para configurar e rodar o projeto localmente.
### 1️⃣ Clonando o Repositório

```
git clone https://github.com/gilson-leonel01/delicias_bovinas.git
cd delicias_bovinas
```

### 2️⃣ Configuração do Ambiente
## 🔹 Backend (.NET / C#)
O backend segue uma arquitetura modular baseada em DDD, com múltiplos projetos organizados por contexto.
📂 Estrutura da Solution

```
backend/
├── UsersManagement
│   ├── UsersManagement.API
│   ├── UsersManagement.Application
│   ├── UsersManagement.Domain
│   └── UsersManagement.Infrastructure
│
├── ProductsManagement
│   ├── ProductsManagement.API
│   ├── ProductsManagement.Application
│   ├── ProductsManagement.Domain
│   └── ProductsManagement.Infrastructure
│
└── Shared
    ├── Shared.Security
    ├── Shared.Database
    └── Shared.Contracts
```

### 📌 Pré-requisitos

* .NET SDK (versão 7 ou superior recomendada)

* SQL Server ou outro banco compatível (conforme configuração)

* Visual Studio 2022+ ou VS Code

### 📌 Configuração

1. Abra a solution no Visual Studio:

   ```
   backend/DeliciasBovinas.sln
   ```

2. Configure a connection string no appsettings.json de cada API.

3. Defina os projetos *.API como Startup Project.

4. Execute as APIs:

   ```
   dotnet run
   ```

As APIs estarão disponíveis, por padrão, em:

* Users API: <https://localhost:5001>

* Products API: <https://localhost:5002>

(as portas podem variar conforme configuração)

## 🔹 Frontend (React + Vite + Tailwind CSS)
### 📌 Tecnologias principais

* React 19

* Vite

* Tailwind CSS

* Redux Toolkit

* React Query

* React Router DOM

* Radix UI

* Zod

* Framer Motion

### 📌 Configuração

1. Acesse o diretório do frontend:

   ```
   cd frontend
   ```

2. Instale as dependências:

   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```
   npm run dev
   ```

O frontend estará disponível em:

```
http://localhost:5173
```

## 📝 Funcionalidades

* 🥩 Catálogo de cortes bovinos

* 👤 Gestão de usuários e autenticação

* 📦 Gestão de produtos e inventário

* 🛒 Pedidos online

* 📊 Organização modular para fácil escalabilidade

* 🔐 Segurança compartilhada entre serviços

## 🛠️ Tecnologias Utilizadas
### 🔹 Backend

* .NET / C#

* [ASP.NET](http://ASP.NET) Web API

* Arquitetura DDD

* Camadas: API, Application, Domain, Infrastructure

* Shared Kernel (Security, Database, Contracts)

### 🔹 Frontend

* React.js

* Vite

* Tailwind CSS

* Redux Toolkit

* React Query (TanStack)

* React Router DOM

* Radix UI

* Zod

* Framer Motion

* Lucide Icons

### 📌 Links Úteis

* .NET Documentation

* [ASP.NET](http://ASP.NET) Web API

* [React](https://react.dev/)

* [Vite](https://vitejs.dev/)

* [Tailwind CSS](https://tailwindcss.com/)

* [TanStack Query](https://tanstack.com/query)

## 🤝 Contribuição
Contribuições são muito bem-vindas! 🚀\
Para contribuir:

1. Faça um fork do repositório.

2. Crie uma nova branch:

   ```
   git checkout -b minha-feature
   ```

3. Faça suas alterações e commit:

   ```
   git commit -m "Minha nova feature"
   ```

4. Envie um Pull Request.

---

Desenvolvido com 🥩🔥 por [Gilson Leonel a.k.a G!](https://github.com/gilson-leonel01)
