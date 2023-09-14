const { models } = require('./../../libs/sequelize');

class OrderService {

  async index() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async find(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if(! order) {
      throw boom.notFound('order not found');
    }
    else {
      return order;
    }
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async update(id, data) {
    const order = await this.find(id);
    if(! order) {
      throw boom.notFound('order not found');
    }
    const updated_order = await order.update(data);

    return updated_order;
  }

  async destroy(id) {
    const order = await this.find(id);
    if(! order) {
      throw boom.notFound('order does not exist');
    }

    await order.destroy();
    return { id };
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
}

module.exports = OrderService;
