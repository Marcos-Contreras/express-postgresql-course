const joi = require('joi');

const id = joi.string();
const name = joi.string().min(3).max(15);
const email = joi.string().email();
const password = joi.string().min(4);
const role = joi.string().min(5);
const createdAt = joi.string();

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = joi.object({
  name: name,
  email: email,
  password: password,
  role: role,
});

const getUserSchema = joi.object({
  id: id.required()
});


module.exports = { createUserSchema, updateUserSchema, getUserSchema };
