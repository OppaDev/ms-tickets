// src/api/dtos/common.dto.js

const { param, query } = require('express-validator');

// Validadores comunes para parámetros de ruta
const validateIdParam = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('El ID debe ser un número entero válido')
];

const validateEventIdParam = [
    param('eventId')
        .isInt({ min: 1 })
        .withMessage('El ID del evento debe ser un número entero válido')
];

const validateUserIdParam = [
    param('userId')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero válido')
];

const validateTypeIdParam = [
    param('typeId')
        .isInt({ min: 1 })
        .withMessage('El ID del tipo de ticket debe ser un número entero positivo')
];

// Validadores comunes para query parameters
const validatePaginationQuery = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La página debe ser un número entero mayor a 0'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('El límite debe ser un número entero entre 1 y 100'),

    query('sortBy')
        .optional()
        .isIn(['id', 'createdAt', 'updatedAt', 'name', 'price', 'status'])
        .withMessage('El campo de ordenamiento no es válido'),

    query('sortOrder')
        .optional()
        .isIn(['ASC', 'DESC'])
        .withMessage('El orden debe ser ASC o DESC')
];

const validateDateRangeQuery = [
    query('startDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de inicio debe ser una fecha válida'),

    query('endDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de fin debe ser una fecha válida')
        .custom((value, { req }) => {
            if (req.query.startDate && new Date(value) <= new Date(req.query.startDate)) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            return true;
        })
];

const validateStatusQuery = [
    query('status')
        .optional()
        .isIn(['pending', 'completed', 'failed', 'refunded', 'valid', 'used', 'cancelled'])
        .withMessage('El estado proporcionado no es válido')
];

module.exports = {
    validateIdParam,
    validateEventIdParam,
    validateUserIdParam,
    validateTypeIdParam,
    validatePaginationQuery,
    validateDateRangeQuery,
    validateStatusQuery
};
