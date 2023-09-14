const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(30);
const lastName = joi.string().min(3).max(30);
const phone = joi.string();
const userId = joi.number().integer();
// USER CREATION DATA
const email = joi.string().email();
const password = joi.string();

const getCustomerSchema = joi.object({
  id: id.required()
});

const createCustomerSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: joi.object({
    name: name.required(),
    email: email.required(),
    password: password.required()
  })
});

const updateCustomerSchema = joi.object({
  name,
  lastName,
  phone,
  userId
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
