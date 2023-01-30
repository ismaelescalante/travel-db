const express = require('express')
const winston = require('winston')
require('dotenv').config()

const app = express()

require('./startup/db')()
require("./startup/logger")();
require("./startup/routes")(app);

app.listen(5000, () => winston.info("Escuchando en el puerto 5000"))

