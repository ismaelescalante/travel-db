const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const express = require("express");

const errors = require("../middleware/errors");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app){
    app.use(helmet());
    app.use(compression());

    app.use(express.json());
    app.use(express.urlencoded({extended:false}))
    app.use(cors());

    app.use("/users", users);
    app.use("/auth", auth);
    app.use(errors);
}