// const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const sequelize = require('./../../libs/sequelize');
const { models } = require('./../../libs/sequelize');

class UsersService {

  async index() {
    const users = await models.User.findAll({
      include: ['customer']
    });
    return users;
  }

  async find(id) {
    const user = await models.User.findByPk(id);
    if(! user) {
      throw boom.notFound('user not found');
    }
    else {
      return user;
    }
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async update(id, data) {
    const user = await this.find(id);
    if(! user) {
      throw boom.notFound('user not found');
    }
    const updated_user = await user.update(data);

    return updated_user;
  }

  async destroy(id) {
    const user = await this.find(id);
    if(! user) {
      throw boom.notFound('user does not exist');
    }

    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;
