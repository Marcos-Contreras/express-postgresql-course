const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('./../../libs/sequelize');

class ProductsService {

  // constructor() {
  //   this.products = [];
  //   this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  // }

  // generate() {
  //   for (let index = 0; index < 10; index++) {
  //     this.products.push(
  //       {
  //         id: faker.string.uuid(),
  //         name: faker.commerce.productName(),
  //         price: parseInt(faker.commerce.price(), 10),
  //         image: faker.image.url(),
  //         isBlock: faker.datatype.boolean()
  //       }
  //     );
  //   }
  // }

  async index() {
    const products = await models.Product.findAll();
    return products;
  }

  async find(id) {
    const product = await models.Product.findByPk(id);
    if(! product) {
      throw boom.notFound('product not found');
    }
    else {
      return product;
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async update(id, data) {
    const product = await this.find(id);
    if(! product) {
      throw boom.notFound('product not found');
    }
    const updated_product = await product.update(data);

    return updated_product;
  }

  async destroy(id) {
    const product = await this.find(id);
    if(! product) {
      throw boom.notFound('product does not exist');
    }

    await product.destroy();
    return { id };
  }

}

 module.exports = ProductsService;
