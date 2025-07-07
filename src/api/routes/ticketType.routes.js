const express = require('express');
const ticketTypeController = require('../controllers/ticketType.controller');
const { createTicketTypeValidator, updateTicketTypeValidator } = require('../dtos');
const { handleValidationErrors } = require('../middleware/validation.middleware');

const { param } = require('express-validator');

const router = express.Router({ mergeParams: true });

// validador para el typeId
const validateTypeIdParam = [
  param('typeId')
    .isInt({ min: 1 })
    .withMessage('El ID del tipo de ticket debe ser un número entero positivo.')
];

// CRUD para tipos de tickets
router.post('/', createTicketTypeValidator, handleValidationErrors, ticketTypeController.create);

router.get('/', ticketTypeController.getAllForEvent);

router.get('/:typeId', validateTypeIdParam, handleValidationErrors, ticketTypeController.getById);

router.put('/:typeId', validateTypeIdParam, updateTicketTypeValidator, handleValidationErrors, ticketTypeController.update);

router.delete('/:typeId', validateTypeIdParam, handleValidationErrors, ticketTypeController.deleteTicketType);

module.exports = router;