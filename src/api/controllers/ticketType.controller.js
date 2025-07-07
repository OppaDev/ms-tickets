const ticketTypeService = require('../services/ticketType.service');
const { NotFoundError } = require('../../utils/errors');

// Crear un nuevo tipo de ticket
const create = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const ticketTypeData = req.body;
        
        const newTicketType = await ticketTypeService.createTicketType(eventId, ticketTypeData);
        
        res.status(201).json(newTicketType);
    } catch (error) {
        next(error);
    }
};

// obtener todos los tipos de ticket de un evento
const getAllForEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        
        const ticketTypes = await ticketTypeService.getTicketTypesByEventId(eventId);
        
        res.status(200).json(ticketTypes);
    } catch (error) {
        next(error);
    }
};

// Obtener un tipo de ticket por ID
const getById = async (req, res, next) => {
    try {
        const { eventId, typeId } = req.params;
        const ticketType = await ticketTypeService.getTicketTypeById(eventId, typeId);
        
        if (!ticketType) {
            throw new NotFoundError(`No se encontró un tipo de ticket con ID ${typeId} para el evento ${eventId}`);
        }
        
        res.status(200).json(ticketType);
    } catch (error) {
        next(error);
    }
};

// Actualizar un tipo de ticket
const update = async (req, res, next) => {
    try {
        const { eventId, typeId } = req.params;
        const updateData = req.body;
        
        const updatedTicketType = await ticketTypeService.updateTicketType(eventId, typeId, updateData);
        
        res.status(200).json(updatedTicketType);
    } catch (error) {
        next(error);
    }
};

// Eliminar (Soft Delete) un tipo de ticket
const deleteTicketType = async (req, res, next) => {
    try {
        const { eventId, typeId } = req.params;
        await ticketTypeService.deleteTicketType(eventId, typeId);
        res.status(204).send(); // 204 No Content
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAllForEvent,
    getById,
    update,
    deleteTicketType
};