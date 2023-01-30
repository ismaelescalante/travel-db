const express = require('express')
require('dotenv').config({ path: '../src/.env' })
const winston = require('winston')

const app = express()

require('./startup/db')()
require("./startup/logger")();
require("./startup/routes")(app);

app.listen(5000, () => winston.info("Escuchando en el puerto 5000"))

