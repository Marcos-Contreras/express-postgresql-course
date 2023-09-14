const express = require('express');
const router = express.Router();
const CustomerService = require('./../services/customer.service');
const service = new CustomerService();
const validatorHandler = require('./../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('./../schemas/customer.schema');

router.get('/', async (req, res) => {
  const customers = await service.index();
  res.json(
      customers
  );
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.find(id);

      res.json(customer);
    } catch (error) {
      // executes the error middleware explicitly
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newCustomer = await service.create(data);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCustomer = await service.update(id, body);
      res.json(updatedCustomer);
    } catch(error) {
      next(error);
    }

  }
);

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCustomer = await service.destroy(id);

      res.json(deletedCustomer);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
