### Installation
Edit .env
  - insert database name
  - setup PORT


```run
$ npm install
$ npm install -g sequelize
$ npm install -g sequelize-cli
$ npm install -g mysql2
$ npm install -g bcrypt
$ cd src
$ run sequelize-cli db:create
$ run sequelize-cli db:migrate
$ run sequelize-cli db:seed:all
$ cd ../
$ run nodemon src/server.js or node src/server.js
```
### Swagger API

| Module | url |
| ------ | ------ |
| CMS | <localhost:3000/cms-docs>
| API | <localhost:3000/api-docs> |

