'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tickets', {
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
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      qr_code: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.ENUM('valid', 'used', 'cancelled', 'refunded'),
        allowNull: false,
        defaultValue: 'valid'
      },
      checked_in_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Índices para mejorar el rendimiento
    await queryInterface.addIndex('tickets', ['order_id']);
    await queryInterface.addIndex('tickets', ['ticket_type_id']);
    await queryInterface.addIndex('tickets', ['user_id']);
    await queryInterface.addIndex('tickets', ['event_id']);
    await queryInterface.addIndex('tickets', ['qr_code'], { unique: true });
    await queryInterface.addIndex('tickets', ['status']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tickets');
  }
};
