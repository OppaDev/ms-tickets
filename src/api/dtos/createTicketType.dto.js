// src/api/dtos/createTicketType.dto.js

const { body } = require('express-validator');

const createTicketTypeValidator = [
    body('name')
        .notEmpty()
        .withMessage('El nombre del tipo de ticket es requerido')
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre debe tener entre 3 y 100 caracteres')
        .trim(),

    body('price')
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El precio debe ser un número decimal válido')
        .isFloat({ min: 0 })
        .withMessage('El precio no puede ser negativo')
        .custom((value) => {
            if (parseFloat(value) < 0) {
                throw new Error('El precio no puede ser negativo');
            }
            return true;
        }),

    body('quantity')
        .isInt({ min: 0 })
        .withMessage('La cantidad debe ser un número entero no negativo'),

    body('saleStartDate')
        .isISO8601()
        .withMessage('La fecha de inicio de venta debe ser una fecha válida')
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error('La fecha de inicio de venta no puede ser en el pasado');
            }
            return true;
        }),

    body('saleEndDate')
        .isISO8601()
        .withMessage('La fecha de fin de venta debe ser una fecha válida')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.saleStartDate)) {
                throw new Error('La fecha de fin de venta debe ser posterior a la fecha de inicio');
            }
            return true;
        })
];

const updateTicketTypeValidator = [
    body('name')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre debe tener entre 3 y 100 caracteres')
        .trim(),

    body('price')
        .optional()
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El precio debe ser un número decimal válido')
        .isFloat({ min: 0 })
        .withMessage('El precio no puede ser negativo'),

    body('quantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('La cantidad debe ser un número entero no negativo'),

    body('saleStartDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de inicio de venta debe ser una fecha válida'),

    body('saleEndDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de fin de venta debe ser una fecha válida')
];

module.exports = {
    createTicketTypeValidator,
    updateTicketTypeValidator
};
