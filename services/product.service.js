const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
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

  index() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000);
    });
    return this.products;
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
