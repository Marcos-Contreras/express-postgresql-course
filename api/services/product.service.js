const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('./../../libs/sequelize');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    for (let index = 0; index < 10; index++) {
      this.products.push(
        {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.url(),
          isBlock: faker.datatype.boolean()
        }
      );
    }
  }

  async index() {
    // const client = await getConnection();
    // const rta = await client.query('SELECT * FROM tasks');
    // const query = 'SELECT * FROM products ';
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return {data};
  }

  find(id) {
    // const name = this.getTotal();
    const product = this.products.find(item => item.id === id);
    if(! product) {
      throw boom.notFound('product not found');
    }
    if(product.isBlock) {
      throw boom.conflict('product is blocked');
    }
    else {
      return product;
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id, data) {
    const product_index = this.products.findIndex(item => item.id === id);

    if(product_index === -1) {
      throw boom.notFound('product not found');
    }

    const product = this.products[product_index];
    this.products[product_index] = {
      ...product,
      ...data
    };

    return this.products[product_index];
  }

  destroy(id) {
    const product_index = this.products.findIndex(item => item.id === id);

    if(product_index === -1) {
      throw boom.notFound('product not found');
    }

    this.products.splice(product_index, 1);
    return { id };
  }

}

 module.exports = ProductsService;
