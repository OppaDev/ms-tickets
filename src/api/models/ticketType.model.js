// src/api/models/ticketType.model.js

const { DataTypes, Model } = require('sequelize');

class TicketType extends Model {
    static associate(models) {
        // Un tipo de ticket tiene muchos items de pedido
        this.hasMany(models.OrderItem, { foreignKey: 'ticketTypeId' });
        // Un tipo de ticket puede generar muchas entradas individuales
        this.hasMany(models.Ticket, { foreignKey: 'ticketTypeId' });
    }

    // Método para serializar el objeto con nombres en español
    toJSON() {
        const values = { ...this.get() };
        
        return {
            id: values.id,
            eventoId: values.eventId,
            nombre: values.name,
            descripcion: values.description,
            precio: parseFloat(values.price),
            moneda: values.currency,
            cantidad: values.quantity,
            totalDisponibles: values.totalDisponibles,
            vendidos: values.vendidos,
            disponibles: values.disponibles,
            minPorCompra: values.minPorCompra,
            maxPorCompra: values.maxPorCompra,
            fechaInicioVenta: values.fechaInicioVenta,
            fechaFinVenta: values.fechaFinVenta,
            fechaCreacion: values.createdAt,
            fechaActualizacion: values.updatedAt
        };
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
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'description'
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
        currency: {
            type: DataTypes.STRING(3),
            allowNull: false,
            defaultValue: 'USD',
            validate: {
                isIn: {
                    args: [['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD']],
                    msg: 'La moneda debe ser una moneda válida.'
                }
            },
            field: 'currency'
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
        totalDisponibles: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'total_disponibles'
        },
        vendidos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'vendidos'
        },
        disponibles: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            field: 'disponibles'
        },
        minPorCompra: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: { args: [1], msg: 'El mínimo por compra debe ser al menos 1.' }
            },
            field: 'min_por_compra'
        },
        maxPorCompra: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            validate: {
                min: { args: [1], msg: 'El máximo por compra debe ser al menos 1.' }
            },
            field: 'max_por_compra'
        },
        fechaInicioVenta: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fecha_inicio_venta'
        },
        fechaFinVenta: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'fecha_fin_venta'
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