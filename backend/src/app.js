//const (constante???) variável
//importa o módulo express para dentro da variável express
//Init do módulo express. Quase como se fosse um init de uma classe. Permite acessar o conteúdo deste módulo
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes') //"./" referencia a mesma pasta deste arquivo
//Armazena a aplicação - Instancia aplicação
const app = express();

app.use(cors());
//Define que a entrada seja em json e que seja convertida de forma entendível na aplicação
app.use(express.json());
app.use(routes);

app.use(errors());

//localhost:3333/
app.listen(3333);

module.exports = app;