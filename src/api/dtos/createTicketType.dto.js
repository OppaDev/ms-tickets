// src/api/dtos/createTicketType.dto.js

const { body } = require('express-validator');

const createTicketTypeValidator = [
    body('nombre')
        .notEmpty()
        .withMessage('El nombre del tipo de ticket es requerido')
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre debe tener entre 3 y 100 caracteres')
        .trim(),

    body('descripcion')
        .optional()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres')
        .trim(),

    body('precio')
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

    body('moneda')
        .optional()
        .isIn(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD'])
        .withMessage('La moneda debe ser una moneda válida'),

    body('cantidad')
        .isInt({ min: 0 })
        .withMessage('La cantidad debe ser un número entero no negativo'),

    body('totalDisponibles')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El total disponible debe ser un número entero no negativo'),

    body('minPorCompra')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El mínimo por compra debe ser al menos 1'),

    body('maxPorCompra')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El máximo por compra debe ser al menos 1')
        .custom((value, { req }) => {
            if (req.body.minPorCompra && parseInt(value) < parseInt(req.body.minPorCompra)) {
                throw new Error('El máximo por compra debe ser mayor o igual al mínimo por compra');
            }
            return true;
        }),

    body('fechaInicioVenta')
        .isISO8601()
        .withMessage('La fecha de inicio de venta debe ser una fecha válida')
        .custom((value) => {
            if (new Date(value) < new Date()) {
                throw new Error('La fecha de inicio de venta no puede ser en el pasado');
            }
            return true;
        }),

    body('fechaFinVenta')
        .isISO8601()
        .withMessage('La fecha de fin de venta debe ser una fecha válida')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.fechaInicioVenta)) {
                throw new Error('La fecha de fin de venta debe ser posterior a la fecha de inicio');
            }
            return true;
        })
];

const updateTicketTypeValidator = [
    body('nombre')
        .optional()
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre debe tener entre 3 y 100 caracteres')
        .trim(),

    body('descripcion')
        .optional()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres')
        .trim(),

    body('precio')
        .optional()
        .isDecimal({ decimal_digits: '0,2' })
        .withMessage('El precio debe ser un número decimal válido')
        .isFloat({ min: 0 })
        .withMessage('El precio no puede ser negativo'),

    body('moneda')
        .optional()
        .isIn(['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD'])
        .withMessage('La moneda debe ser una moneda válida'),

    body('cantidad')
        .optional()
        .isInt({ min: 0 })
        .withMessage('La cantidad debe ser un número entero no negativo'),

    body('totalDisponibles')
        .optional()
        .isInt({ min: 0 })
        .withMessage('El total disponible debe ser un número entero no negativo'),

    body('minPorCompra')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El mínimo por compra debe ser al menos 1'),

    body('maxPorCompra')
        .optional()
        .isInt({ min: 1 })
        .withMessage('El máximo por compra debe ser al menos 1'),

    body('fechaInicioVenta')
        .optional()
        .isISO8601()
        .withMessage('La fecha de inicio de venta debe ser una fecha válida'),

    body('fechaFinVenta')
        .optional()
        .isISO8601()
        .withMessage('La fecha de fin de venta debe ser una fecha válida')
];

module.exports = {
    createTicketTypeValidator,
    updateTicketTypeValidator
};
