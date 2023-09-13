const express = require('express');
const router = express.Router();
const UsersService = require('./../services/user.service');
const service = new UsersService();
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema')

router.get('/', async (req, res) => {
  const users = await service.index();
  res.json(
      users
  );
});

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.find(id);

      res.json(product);
    } catch (error) {
      // executes the error middleware explicitly
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newProduct = await service.create(data);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedProduct = await service.update(id, body);
      res.json(updatedProduct);
    } catch(error) {
      next(error);
    }

  }
);

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedProduct = await service.destroy(id);

      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
