'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Renombrar columnas para usar nombres más descriptivos
    await queryInterface.renameColumn('ticket_types', 'sale_start_date', 'fecha_inicio_venta');
    await queryInterface.renameColumn('ticket_types', 'sale_end_date', 'fecha_fin_venta');
  },

  async down (queryInterface, Sequelize) {
    // Revertir los cambios de nombres de columnas
    await queryInterface.renameColumn('ticket_types', 'fecha_fin_venta', 'sale_end_date');
    await queryInterface.renameColumn('ticket_types', 'fecha_inicio_venta', 'sale_start_date');
  }
};
