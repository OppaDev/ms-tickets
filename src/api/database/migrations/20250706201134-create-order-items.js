'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ticket_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ticket_types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price_at_purchase: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      }
    });

    // Índices para mejorar el rendimiento
    await queryInterface.addIndex('order_items', ['order_id']);
    await queryInterface.addIndex('order_items', ['ticket_type_id']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  }
};
