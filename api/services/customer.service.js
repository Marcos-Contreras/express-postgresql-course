// const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('./../../libs/sequelize');
const { models } = require('./../../libs/sequelize');

class CustomerService {

  async index() {
    const customers = await models.Customer.findAll({
      include: ['user']
    });
    return customers;
  }

  async find(id) {
    const customer = await models.Customer.findByPk(id);
    if(! customer) {
      throw boom.notFound('customer not found');
    }
    else {
      return customer;
    }
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async update(id, data) {
    const customer = await this.find(id);
    if(! customer) {
      throw boom.notFound('customer not found');
    }
    const updated_customer = await customer.update(data);

    return updated_customer;
  }

  async destroy(id) {
    const customer = await this.find(id);
    if(! customer) {
      throw boom.notFound('user does not exist');
    }

    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
