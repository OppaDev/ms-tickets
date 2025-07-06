// src/api/models/ticketType.model.js

const { DataTypes, Model } = require('sequelize');

class TicketType extends Model {
    static associate(models) {
        // Un tipo de ticket tiene muchos items de pedido
        this.hasMany(models.OrderItem, { foreignKey: 'ticketTypeId' });
        // Un tipo de ticket puede generar muchas entradas individuales
        this.hasMany(models.Ticket, { foreignKey: 'ticketTypeId' });
    }
}

const initTicketType = (sequelize) => {
    TicketType.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        eventId: { // Referencia lógica a un evento
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'event_id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'El nombre del tipo de ticket no puede estar vacío.' },
                len: { args: [3, 100], msg: 'El nombre debe tener entre 3 y 100 caracteres.' }
            },
            field: 'name'
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: { msg: 'El precio debe ser un número decimal.' },
                min: { args: [0], msg: 'El precio no puede ser negativo.' }
            },
            field: 'price'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'La cantidad debe ser un número entero.' },
                min: { args: [0], msg: 'La cantidad no puede ser negativa.' }
            },
            field: 'quantity'
        },
        saleStartDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'sale_start_date'
        },
        saleEndDate: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'sale_end_date'
        }
    }, {
        sequelize,
        modelName: 'TicketType',
        tableName: 'ticket_types',
        timestamps: true, // createdAt, updatedAt
        paranoid: true,  // deletedAt (soft delete)
        underscored: true
    });
    return TicketType;
};

module.exports = initTicketType;