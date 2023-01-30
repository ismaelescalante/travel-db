const mongoose = require('mongoose')
const winston = require('winston')

mongoose.set('strictQuery', false)

module.exports = function(){
    mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true }).then(() => winston.info('Hay conexión'))
}