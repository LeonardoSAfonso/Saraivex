const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   titulo: {
      type: String,
      required: true
   },
   subtitulo: {
      type: String
   },
   autor: {
      type: mongoose.ObjectId,
      ref: 'Autor', // Nome do model referenciado
      required: true
   },
   sinopse: {
      type: String,
      required: true
   },
   qtd_paginas: {
      type: String,

   },
   data_lancamento: {
      type: Date,
      required: true
   },
   edicao: {
      type: String, 
      required: true
   },
   isbn: {
      type: String,
      required: true,
      index: {unique: true}
   },
   genero: {
      type: String,
      required: true
   },
   editora: {
      type: mongoose.ObjectId,
      ref: 'Editora', // Nome do model referenciado
      required: true
   },
   preco_compra: {
      type: Number,
      required: true,
      min: 0
   },
   preco_venda: {
      type: Number,
      min: 0
   },   
   quantidade: {
      type: Number,
      required: true,
      default: 0 // Valor padrão
   }
   
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('Livro', esquema, 'livros')