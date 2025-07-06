// src/api/dtos/createOrderItem.dto.js

const { body } = require('express-validator');

const createOrderItemValidator = [
    body('orderId')
        .isInt({ min: 1 })
        .withMessage('El ID del pedido debe ser un número entero válido'),

    body('ticketTypeId')
        .isInt({ min: 1 })
        .withMessage('El ID del tipo de ticket debe ser un número entero válido'),

    body('quantity')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un número entero mayor a 0')
        .custom((value) => {
            if (value > 10) {
                throw new Error('No se pueden comprar más de 10 tickets del mismo tipo por pedido');
            }
            return true;
        }),

    body('priceAtPurchase')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El precio debe ser un número decimal válido')
        .isFloat({ min: 0 })
        .withMessage('El precio no puede ser negativo')
];

const updateOrderItemValidator = [
    body('quantity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un número entero mayor a 0')
        .custom((value) => {
            if (value > 10) {
                throw new Error('No se pueden comprar más de 10 tickets del mismo tipo por pedido');
            }
            return true;
        }),

    body('priceAtPurchase')
        .optional()
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El precio debe ser un número decimal válido')
        .isFloat({ min: 0 })
        .withMessage('El precio no puede ser negativo')
];

module.exports = {
    createOrderItemValidator,
    updateOrderItemValidator
};
