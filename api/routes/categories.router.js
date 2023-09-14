const express = require('express');
const router = express.Router();
const CategoryService = require('./../services/category.service');
const service = new CategoryService();
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');

router.get('/', async (req, res) => {
  const categories = await service.index();
  res.json(
    categories
  );
});

router.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.find(id);

      res.json(category);
    } catch (error) {
      // executes the error middleware explicitly
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newCategory = await service.create(data);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedCategory = await service.update(id, body);
      res.json(updatedCategory);
    } catch(error) {
      next(error);
    }

  }
);

router.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedCategory = await service.destroy(id);

      res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
