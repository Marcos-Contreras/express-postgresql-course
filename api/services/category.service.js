// const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('./../../libs/sequelize');

class CategoryService {

  async index() {
    const categories = await models.Category.findAll(
    // {
    //   include: ['products']
    // }
    );
    return categories;
  }

  async find(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if(! category) {
      throw boom.notFound('category not found');
    }
    else {
      return category;
    }
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async update(id, data) {
    const category = await this.find(id);
    if(! category) {
      throw boom.notFound('category not found');
    }
    const updated_category = await category.update(data);

    return updated_category;
  }

  async destroy(id) {
    const category = await this.find(id);
    if(! category) {
      throw boom.notFound('user does not exist');
    }

    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;
