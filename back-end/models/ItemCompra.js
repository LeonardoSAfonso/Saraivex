const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   quantidade: {
      type: Number,
      required: true
   },
   desconto: {
      type: Number,
      required: true,
      default: 0  // Se nenhum valor for especificado, assume 0
   },
   acrescimo: {
      type: Number,
      required: true,
      default: 0
   },
   compra: {
      type: mongoose.ObjectId,
      ref: 'Compra',
      required: true
   },
   produto: {
      type: mongoose.ObjectId,
      ref: 'Livro',
      required: true
   }
})

/*
   Parâmetros do método mongoose.model()
   1º -> Nome do modelo
   2º -> Estrutura (esquema) do modelo
   3º -> Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no
      MongoDB
*/
module.exports = mongoose.model('ItemCompra', esquema, 'itens_compra')