const jwt = require("jsonwebtoken");
const Joi = require("joi");
const _ = require("lodash");
const mongoose = require("mongoose");
const validator = require("../middleware/joiValidation");

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  });

  userSchema.methods.generateToken = function () {
    return jwt.sign(
      _.pick(this, ["_id", "name", "isAdmin"]),
      process.env.JWT_PRIVATE_KEY
    );
  };

  const User = mongoose.model("User", userSchema);

const reqSchema = Joi.object({
  username: Joi.string()
    .required()
    .messages({ "any.required": `El campo "name" es requerido` }),
  email: Joi.string()
    .required()
    .email()
    .messages({ "any.required": `El campo "email" es requerido` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `El campo "password" es requerido` }),
});

exports.User = User;
exports.validateBody = validator(reqSchema);
