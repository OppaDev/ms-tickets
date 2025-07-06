// src/api/models/ticket.model.js

const { DataTypes, Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Ticket extends Model {
    static associate(models) {
        // Una entrada pertenece a un pedido
        this.belongsTo(models.Order, { foreignKey: 'orderId' });
        // Una entrada pertenece a un tipo de ticket
        this.belongsTo(models.TicketType, { foreignKey: 'ticketTypeId' });
    }
}

const initTicket = (sequelize) => {
    Ticket.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // ID del usuario propietario de la entrada
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        // ID del evento para búsqueda rápida
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'event_id'
        },
        qrCode: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(), // Genera un identificador único para el QR
            unique: true,
            allowNull: false,
            field: 'qr_code'
        },
        status: {
            type: DataTypes.ENUM('valid', 'used', 'cancelled', 'refunded'),
            allowNull: false,
            defaultValue: 'valid'
        },
        checkedInAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'checked_in_at'
        }
    }, {
        sequelize,
        modelName: 'Ticket',
        tableName: 'tickets',
        timestamps: true,
        paranoid: true,
        underscored: true
    });
    return Ticket;
};

module.exports = initTicket;