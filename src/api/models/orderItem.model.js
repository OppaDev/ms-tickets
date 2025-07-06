// src/api/models/orderItem.model.js

const { DataTypes, Model } = require('sequelize');

class OrderItem extends Model {
    static associate(models) {
        // Un item de pedido pertenece a un pedido
        this.belongsTo(models.Order, { foreignKey: 'orderId' });
        // Un item de pedido pertenece a un tipo de ticket
        this.belongsTo(models.TicketType, { foreignKey: 'ticketTypeId' });
    }
}

const initOrderItem = (sequelize) => {
    OrderItem.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        priceAtPurchase: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'price_at_purchase'
        }
    }, {
        sequelize,
        modelName: 'OrderItem',
        tableName: 'order_items',
        timestamps: false, // Generalmente no se necesitan timestamps aquí
        underscored: true
    });
    return OrderItem;
};

module.exports = initOrderItem;