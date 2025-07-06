// src/api/models/order.model.js

const { DataTypes, Model } = require('sequelize');

class Order extends Model {
    static associate(models) {
        // Un pedido tiene muchos items (líneas de pedido)
        this.hasMany(models.OrderItem, { foreignKey: 'orderId' });
        // Un pedido genera muchas entradas individuales
        this.hasMany(models.Ticket, { foreignKey: 'orderId' });
    }
}

const initOrder = (sequelize) => {
    Order.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // ID del usuario del microservicio de Usuarios
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: true,
                min: 0
            },
            field: 'total_amount'
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
            allowNull: false,
            defaultValue: 'pending'
        },
        paymentGatewayId: {
            type: DataTypes.STRING, // ID de la transacción en la pasarela de pago (ej. Stripe)
            allowNull: true,
            field: 'payment_gateway_id'
        }
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true,
        paranoid: true,
        underscored: true
    });
    return Order;
};

module.exports = initOrder;