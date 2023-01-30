const mongoose = require('mongoose')
const winston = require('winston')

mongoose.set('strictQuery', false)

module.exports = function(){
    const db = process.env.MONGO_URI
    mongoose.connect(db).then(() => winston.info('Hay conexión'))
}