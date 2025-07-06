// src/api/dtos/createTicket.dto.js

const { body } = require('express-validator');

const createTicketValidator = [
    body('userId')
        .isInt({ min: 1 })
        .withMessage('El ID del usuario debe ser un número entero válido'),

    body('eventId')
        .isInt({ min: 1 })
        .withMessage('El ID del evento debe ser un número entero válido'),

    body('orderId')
        .isInt({ min: 1 })
        .withMessage('El ID del pedido debe ser un número entero válido'),

    body('ticketTypeId')
        .isInt({ min: 1 })
        .withMessage('El ID del tipo de ticket debe ser un número entero válido')
];

const updateTicketStatusValidator = [
    body('status')
        .isIn(['valid', 'used', 'cancelled', 'refunded'])
        .withMessage('El estado debe ser uno de: valid, used, cancelled, refunded'),

    body('checkedInAt')
        .optional()
        .isISO8601()
        .withMessage('La fecha de check-in debe ser una fecha válida')
        .custom((value) => {
            if (new Date(value) > new Date()) {
                throw new Error('La fecha de check-in no puede ser en el futuro');
            }
            return true;
        })
];

const validateTicketQRValidator = [
    body('qrCode')
        .isUUID()
        .withMessage('El código QR debe ser un UUID válido')
];

const checkInTicketValidator = [
    body('qrCode')
        .isUUID()
        .withMessage('El código QR debe ser un UUID válido'),

    body('eventId')
        .isInt({ min: 1 })
        .withMessage('El ID del evento debe ser un número entero válido')
];

module.exports = {
    createTicketValidator,
    updateTicketStatusValidator,
    validateTicketQRValidator,
    checkInTicketValidator
};
