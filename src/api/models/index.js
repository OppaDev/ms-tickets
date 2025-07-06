// src/api/models/index.js

const { sequelize } = require('../../config/database');
const initTicketType = require('./ticketType.model');
const initOrder = require('./order.model');
const initTicket = require('./ticket.model');
const initOrderItem = require('./orderItem.model');

const models = {
    TicketType: initTicketType(sequelize),
    Order: initOrder(sequelize),
    Ticket: initTicket(sequelize),
    OrderItem: initOrderItem(sequelize),
};

// Establecer asociaciones
Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

// Exportar sequelize y los modelos
module.exports = {
    sequelize,
    ...models
};