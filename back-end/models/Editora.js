const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   nome_fantasia: {
      type: String,
      required: true
   },
   cnpj: {
      type: String,
      required: true,
      index: { unique: true } // Não pode repetir CNPJ
   },
   endereco: {
      type: String,
      required: true
   },
   telefone: {
      type: String,
      required: true
   },
   email: {
      type: String,
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
module.exports = mongoose.model('Editora', esquema, 'editoras')