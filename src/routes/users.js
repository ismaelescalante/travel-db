const bcrypt = require("bcrypt");
const { User, validateBody } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", validateBody, async (req, res) => {
  let user = await User.findOne({ email: req.body.email, username: req.body.username });
  if (user) return res.status(400).send("El usuario ya está registrado");

  let username = await User.findOne({username: req.body.username})
  if(username) return res.status(400).send('User already exists')

  user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;

  await user.save();

  const token = user.generateToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send("Usuario autentificado");
});

module.exports = router;