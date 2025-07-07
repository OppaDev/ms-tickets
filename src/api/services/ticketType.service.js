const { TicketType, OrderItem } = require('../models');

const createTicketType = async (eventId, data) => {
    const ticketTypeData = { ...data, eventId };
    const newTicketType = await TicketType.create(ticketTypeData);
    return newTicketType;
};

const getTicketTypesByEvent = async (eventId) => {
    const ticketTypes = await TicketType.findAll({
        where: { eventId }
    });
    return ticketTypes;
};

const getTicketTypeById = async (eventId, typeId) => {
    const ticketType = await TicketType.findOne({
        where: { id: typeId, eventId }
    });
    return ticketType;
};

const updateTicketType = async (eventId, typeId, updateData) => {
    const ticketType = await getTicketTypeById(eventId, typeId);
    if (!ticketType) {
        throw new NotFoundError(`No se encontró un tipo de ticket con ID ${typeId} para el evento ${eventId}`);
    }

    // Lógica de negocio: No permitir reducir la cantidad por debajo de los vendidos.
    if (updateData.quantity) {
        const soldTickets = await OrderItem.sum('quantity', {
            where: { ticketTypeId: typeId }
        });
        if (updateData.quantity < (soldTickets || 0)) {
            throw new ConflictError(`No se puede reducir la cantidad a ${updateData.quantity} porque ya se han vendido ${soldTickets} tickets.`);
        }
    }
    
    await ticketType.update(updateData);
    return ticketType;
};

const deleteTicketType = async (eventId, typeId) => {
    const ticketType = await getTicketTypeById(eventId, typeId);
    if (!ticketType) {
        throw new NotFoundError(`No se encontró un tipo de ticket con ID ${typeId} para el evento ${eventId}`);
    }

    // Lógica de negocio: No eliminar si ya hay tickets vendidos.
    const soldTickets = await OrderItem.count({ where: { ticketTypeId: typeId } });
    if (soldTickets > 0) {
        throw new ConflictError('No se puede eliminar este tipo de ticket porque ya tiene ventas asociadas.');
    }
    
    await ticketType.destroy();
};

module.exports = {
    createTicketType,
    getTicketTypesByEvent,
    getTicketTypeById,
    updateTicketType,
    deleteTicketType,
};