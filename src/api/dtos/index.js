// src/api/dtos/index.js

// Importar todos los DTOs
const { createTicketTypeValidator, updateTicketTypeValidator } = require('./createTicketType.dto');
const { createOrderValidator, updateOrderStatusValidator } = require('./createOrder.dto');
const { 
    createTicketValidator, 
    updateTicketStatusValidator, 
    validateTicketQRValidator,
    checkInTicketValidator 
} = require('./createTicket.dto');
const { createOrderItemValidator, updateOrderItemValidator } = require('./createOrderItem.dto');
const { 
    validateIdParam, 
    validateEventIdParam, 
    validateUserIdParam,
    validateTypeIdParam,
    validatePaginationQuery,
    validateDateRangeQuery,
    validateStatusQuery
} = require('./common.dto');

module.exports = {
    // TicketType DTOs
    createTicketTypeValidator,
    updateTicketTypeValidator,
    
    // Order DTOs
    createOrderValidator,
    updateOrderStatusValidator,
    
    // Ticket DTOs
    createTicketValidator,
    updateTicketStatusValidator,
    validateTicketQRValidator,
    checkInTicketValidator,
    
    // OrderItem DTOs
    createOrderItemValidator,
    updateOrderItemValidator,
    
    // Common DTOs
    validateIdParam,
    validateEventIdParam,
    validateUserIdParam,
    validateTypeIdParam,
    validatePaginationQuery,
    validateDateRangeQuery,
    validateStatusQuery
};
