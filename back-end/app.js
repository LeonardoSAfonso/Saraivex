var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const cors = require("cors");
app.use(cors());

const db = require('./config/database')
db('mongodb://localhost:27017/myproject')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let teste = require('./routes/teste')
app.use('/teste', teste)

const editora = require('./routes/editora')
app.use('/editora', editora)

const livro = require('./routes/livro')
app.use('/livro', livro)

const cliente = require('./routes/cliente')
app.use('/cliente', cliente)

const autor = require('./routes/autor')
app.use('/autor', autor)

const venda = require('./routes/venda')
app.use('/venda', venda)

const item_venda = require('./routes/item_venda')
app.use('/item_venda', item_venda)

const compra = require('./routes/compra')
app.use('/compra', compra)

const item_compra = require('./routes/item_compra')
app.use('/item_compra', item_compra)

const livreiro = require('./routes/livreiro')
app.use('/livreiro', livreiro)


module.exports = app;
