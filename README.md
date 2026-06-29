# Projeto Indústria — API de Controle de Produtos

API REST desenvolvida com Node.js, Express, PostgreSQL e Prisma ORM para gerenciamento de produtos industriais.

## Tecnologias

- **Node.js** — Ambiente de execução JavaScript
- **Express** — Framework para criação de APIs REST
- **PostgreSQL** — Banco de dados relacional
- **Prisma** — ORM para comunicação com o banco de dados

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/projeto-industria.git
cd projeto-industria

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com as credenciais do seu banco PostgreSQL

# Executar as migrations do banco
npx prisma migrate dev --name init

# Iniciar o servidor
npm run dev
```

## Rotas da API

| Método | Rota           | Descrição           | RF    |
|--------|----------------|---------------------|-------|
| POST   | /produtos      | Cadastrar produto   | RF01  |
| GET    | /produtos      | Listar produtos     | RF02  |
| GET    | /produtos/:id  | Buscar por ID       | RF02  |
| PUT    | /produtos/:id  | Atualizar produto   | RF03  |
| DELETE | /produtos/:id  | Excluir produto     | RF04  |

## Exemplo de corpo da requisição (POST/PUT)

```json
{
  "nome": "Parafuso M8",
  "descricao": "Parafuso sextavado M8x30mm",
  "quantidade": 500,
  "preco": 0.75
}
```

## Códigos de status HTTP

| Status | Significado                        |
|--------|------------------------------------|
| 200    | OK — requisição bem-sucedida       |
| 201    | Created — recurso criado           |
| 204    | No Content — excluído com sucesso  |
| 400    | Bad Request — dados inválidos      |
| 404    | Not Found — produto não encontrado |
| 500    | Internal Server Error              |
