const express = require('express')
const winston = require('winston')
require('dotenv').config({path: '../.env'})

const app = express()

require('./startup/db')()
require("./startup/logger")();
require("./startup/routes")(app);

app.listen(5000, () => winston.info("Escuchando en el puerto 5000"))

