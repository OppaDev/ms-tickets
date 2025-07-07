'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('ticket_types', 'description', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: 'name'
    });

    await queryInterface.addColumn('ticket_types', 'currency', {
      type: Sequelize.STRING(3),
      allowNull: false,
      defaultValue: 'USD',
      after: 'price'
    });

    await queryInterface.addColumn('ticket_types', 'total_disponibles', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: 'quantity'
    });

    await queryInterface.addColumn('ticket_types', 'vendidos', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: 'total_disponibles'
    });

    await queryInterface.addColumn('ticket_types', 'disponibles', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: 'vendidos'
    });

    await queryInterface.addColumn('ticket_types', 'min_por_compra', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      after: 'disponibles'
    });

    await queryInterface.addColumn('ticket_types', 'max_por_compra', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10,
      after: 'min_por_compra'
    });

    // Crear índices para optimizar consultas
    await queryInterface.addIndex('ticket_types', ['currency']);
    await queryInterface.addIndex('ticket_types', ['disponibles']);
    await queryInterface.addIndex('ticket_types', ['vendidos']);
  },

  async down (queryInterface, Sequelize) {
    // Eliminar índices primero
    await queryInterface.removeIndex('ticket_types', ['currency']);
    await queryInterface.removeIndex('ticket_types', ['disponibles']);
    await queryInterface.removeIndex('ticket_types', ['vendidos']);

    // Eliminar columnas
    await queryInterface.removeColumn('ticket_types', 'max_por_compra');
    await queryInterface.removeColumn('ticket_types', 'min_por_compra');
    await queryInterface.removeColumn('ticket_types', 'disponibles');
    await queryInterface.removeColumn('ticket_types', 'vendidos');
    await queryInterface.removeColumn('ticket_types', 'total_disponibles');
    await queryInterface.removeColumn('ticket_types', 'currency');
    await queryInterface.removeColumn('ticket_types', 'description');
  }
};
