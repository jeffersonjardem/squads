




<h1>SQUADS - Backend Developer II</h1>




Projeto desenvolvido com Node.js e MongoDB





### Features


-  [x] Criação de Usuários

-  [x] Autenticação JWT

-  [x] CRUD de Produtos

-  [x] Conexão com o Banco de Dados MongoDB



### Pré-requisitos





Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:



-  [Git](https://git-scm.com/)



-  [Node.js](https://nodejs.org/pt-br/)



-  [Mongodb](https://mongodb.com)



-  [Docker](https://www.docker.com/)



-  [Docker Compose](https://docs.docker.com/compose/install/)




### Executando a Aplicação



````bash
# Clone este repositório
git clone https://github.com/jeffersonjardem/squads.git

# Acesse a pasta do projeto no terminal
cd squads

# Instale as dependências
$ npm install

# Construir os containers
$ docker-compose build

# Inicie a aplicação com o docker compose, rodando na porta 9000
$ docker-compose up



````

### Testes com Jest
 - npm run test


### Testes com Postman
 - Importe o arquivo [squads.postman.json](https://github.com/jeffersonjardem/squads/blob/main/squads.postman.json) para o postman
 - Execute as requests(localhost:9000)
   - /users  - Crie uma conta informando name, email, password
   - /login   - Autentique-se para realizar as demais requests (email, password)
   - /products - Os produtos só poderão ser listados mediante autorização os campos de products são name, description, value.
     - **POST** /product/
	 - **GET** /product/id
	 - **PUT** /product/id
	 - **DELETE** /product/id




### Tecnologias



As seguintes ferramentas foram usadas na construção do projeto:



-  [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)



-  [Node.js](https://nodejs.org/pt-br/)



-  [Mongodb](https://mongodb.com)



-  [Docker](https://www.docker.com/)




### Autor

<a  href="https://github.com/jeffersonjardem"  style="text-decoration: none;"> Jefferson Jardem</a>
