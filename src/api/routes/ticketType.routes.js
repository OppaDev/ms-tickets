const express = require('express');
const ticketTypeController = require('../controllers/ticketType.controller');
const { 
    createTicketTypeValidator, 
    updateTicketTypeValidator, 
    validateEventIdParam,
    validateTypeIdParam
} = require('../dtos');
const { handleValidationErrors } = require('../middleware/validation.middleware');

const router = express.Router({ mergeParams: true });

// Validar eventId en todas las rutas
router.use(validateEventIdParam, handleValidationErrors);

// CRUD para tipos de tickets
router.post('/', createTicketTypeValidator, handleValidationErrors, ticketTypeController.create);

router.get('/', ticketTypeController.getAllForEvent);

router.get('/:typeId', validateTypeIdParam, handleValidationErrors, ticketTypeController.getById);

router.put('/:typeId', validateTypeIdParam, updateTicketTypeValidator, handleValidationErrors, ticketTypeController.update);

router.delete('/:typeId', validateTypeIdParam, handleValidationErrors, ticketTypeController.deleteTicketType);

module.exports = router;