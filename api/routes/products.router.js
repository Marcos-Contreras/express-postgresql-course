const express = require('express');
const router = express.Router();
const ProductsService = require('./../services/product.service');
const service = new ProductsService();
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

router.get('/', async (req, res) => {
  const products = await service.index();
  res.json(
      products
  );
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
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
  validatorHandler(createProductSchema, 'body'),
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
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deletedProduct = service.destroy(id);

  res.json(deletedProduct);
});

module.exports = router;
