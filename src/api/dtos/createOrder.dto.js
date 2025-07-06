// src/api/dtos/createOrder.dto.js

const { body } = require('express-validator');

const createOrderValidator = [
    body('userId')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero válido'),

    body('orderItems')
        .isArray({ min: 1 })
        .withMessage('Debe incluir al menos un item en el pedido'),

    body('orderItems.*.ticketTypeId')
        .isInt({ min: 1 })
        .withMessage('El ID del tipo de ticket debe ser un número entero válido'),

    body('orderItems.*.quantity')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un número entero mayor a 0'),

    body('orderItems.*.priceAtPurchase')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El precio debe ser un número decimal válido')
        .isFloat({ min: 0 })
        .withMessage('El precio no puede ser negativo'),

    body('totalAmount')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El monto total debe ser un número decimal válido')
        .isFloat({ min: 0 })
        .withMessage('El monto total no puede ser negativo')
        .custom((value, { req }) => {
            // Validar que el total coincida con la suma de los items
            const calculatedTotal = req.body.orderItems.reduce((total, item) => {
                return total + (parseFloat(item.priceAtPurchase) * parseInt(item.quantity));
            }, 0);
            
            if (Math.abs(parseFloat(value) - calculatedTotal) > 0.01) {
                throw new Error('El monto total no coincide con la suma de los items');
            }
            return true;
        })
];

const updateOrderStatusValidator = [
    body('status')
        .isIn(['pending', 'completed', 'failed', 'refunded'])
        .withMessage('El estado debe ser uno de: pending, completed, failed, refunded'),

    body('paymentGatewayId')
        .optional()
        .isString()
        .withMessage('El ID de la pasarela de pago debe ser una cadena de texto')
        .isLength({ min: 1, max: 255 })
        .withMessage('El ID de la pasarela de pago debe tener entre 1 y 255 caracteres')
];

module.exports = {
    createOrderValidator,
    updateOrderStatusValidator
};
