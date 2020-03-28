<h1 align="center">
  <img alt="Imagem da Logo do Framework node.js" src="https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_1280.png" height="120" />
  <br />
  <img alt="Imagem da Logo do Framework express.js" src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" height="90" />
  <br />
  <img alt="Imagem da Logo do Framework express.js" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" height="90" />
</h1>
<h2 align="center">Node.JS simple backend project | version: 4</h2>

<h3 align="center">Este é um projeto para testar rotas de Back-end e persistência de dados em um banco de dados relacional! O projeto tambêm usa para acesso de certas rotas a validação de session token.</h3>

### :ferris_wheel: Para rodar a Aplicação
  
1.  Instale o node.js em [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2.  Instale o YARN em [https://classic.yarnpkg.com/en/docs/install/](https://classic.yarnpkg.com/en/docs/install/)
3. Instale o postgresql de acordo com sua preferência:
>  -  Instale o postgres diretamente em [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
>  #### OBS.: Garanta que os seguintes atributos tenham os seguintes atributos:
>  Port: 5432 <br />
>  Username: postgres <br />
>  Password: docker
>  -  Instale usando o Docker :whale:
>  1.  Instale o Docker em https://www.docker.com/products/docker-desktop
>  2.  Abra o terminal do Docker e digite o comando:
>      ```bash
>      docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
>      ```
>  3.  Rode o comando, para iniciar o banco de dados:
>      ```bash
>      docker start database
>      ```
4.  Instale o Postbird em [https://github.com/Paxa/postbird/releases](https://github.com/Paxa/postbird/releases)
5.  Conecte-se ao Postbird com as informações:
  -  Host: 127.0.0.1
  -  Port: 5432
  -  Username: postgres
  -  Password: docker
>  #### OBS.: Caso seja necessário altere o host dentro da pasta *src/config/database.js* para localhost ou IPV4 dado pelo seu docker se utilizar um ambiente virtualizado!
>  ```javascript
>  module.exports = {
>    dialect: "postgres",
>    host: "127.0.0.1", //IP given by your docker machine OR your localhost
>    username: "postgres",
>    password: "docker",
>    database: "users_database",
>    define: {
>      timestamps: true,
>      underscored: true,
>      underscoredAll: true
>    }
>  };
>  ```
6.  Na pasta do projeto rode o comando:
```bash
yarn create-migration
```
7.  Após rodar o comando da linha acima altere o conteudo dentro de *src/database/migrations/'timestamp'-create-user.js* para:
```javascript
"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
```
8.  Em seguida rode o comando:
```bash
yarn create-table
```
9.  Rode em seguida o comando abaixo para criar seu arquivo de seeds:
```bash
yarn create-seed
```
10.  Após rodar o comando da linha acima altere o conteudo dentro de *src/database/seeds/'timestamp'-create-user.js* para:
```javascript
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password_hash:
            '$2y$08$ZBWJLu3D6jqLeWgQB58Df.X9mXIMDFZ0yuubNNjE8B6x.tMw7xu6a', // password = 123456
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'John Travolta',
          email: 'johntravolta@gmail.com',
          password_hash:
            '$2y$08$dLdy6jNBdGbnDM//Jmavwu2LFgOK9bY.gIhRukAZ8fl0T0ezK6Ko6', // password = 1234567
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Jane Doe',
          email: 'janedoe@gmail.com',
          password_hash:
            '$2y$08$U4tVEnQnT4qTfAMuD3F57OXGzsd.RdkBrU5ZJhzlm7gRFRuqrbYRC', // password = 12345678
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
```
11.  Em seguida rode o comando abaixo para popular sua base de dados:
```bash
yarn create-users
```
12.  Rode por último o comando para subir :rocket: sua aplicação:
```bash
yarn dev
```
>  -  Caso esteja rodando o projeto via docker utilize o comando:
>  ```bash
>  docker start database
>  ```
>  #### OBS.: para parar a execução do docker rode o comando:
>  ```bash
>  docker stop database
>  ```

### :airplane: Rotas da aplicação
- `POST /session`: Rota cria uma sessão por *7 dias* para um usuário existente na base de dados. No corpo da requisição é passado um JSON no seguinte formato:
```javascript
{
  email: "johndoe@gmail.com",
  password: "123456"
}
```
----
- `GET /user`: Rota que lista todos os usuários. 
>  OBS.: *Esta rota para ser acessada necessita de um session token válido*;
- `POST /user`: Rota cadastra um novo usuário no banco de dados. No corpo da requisição deve ser informado um JSON no seguint formato:
```javascript
{
  name: "Gabriel",
  email: "example@gmail.com",
  password: "123456"
}
```
>  OBS.: *Esta rota NÃO precisa ser acessada com um session token válido*;
- `PUT /user`: Rota altera a senha do usuário no banco de dados. No corpo da requisição de ser informado um JSON no seguinte formato:
```javascript
{
  email: "example@gmail.com",
  old_password: "123456",
  password: "1234567"
}
```
>  OBS.: *Esta rota para ser acessada necessita de um session token válido*;
- `DELETE /user`: A rota deleta o usuário com o email específico. No corpo da requisição de ser informado um JSON no seguinte formato:
```javascript
{
  email: "example@gmail.com",
}
```
>  OBS.: *Esta rota para ser acessada necessita de um session token válido*;
