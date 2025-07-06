const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    evento_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'eventos',
            key: 'id'
        }
    },
    zona_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'zonas',
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 150]
        }
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    cantidad_disponible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    fecha_inicio_venta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin_venta: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'tickets',
    timestamps: false,
    underscored: true,
    paranoid: true,
});