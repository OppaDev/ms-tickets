const { TicketType, OrderItem } = require('../models');
const { ConflictError, NotFoundError } = require('../../utils/errors');

const createTicketType = async (eventId, data) => {
    const existingType = await TicketType.findOne({
        where: { eventId, name: data.nombre }
    });
    if (existingType) {
        throw new ConflictError(`Ya existe un tipo de ticket con el nombre "${data.nombre}" para este evento.`);
    }

    // Mapear campos del español al inglés para la base de datos
    const ticketTypeData = {
        eventId,
        name: data.nombre,
        description: data.descripcion,
        price: data.precio,
        currency: data.moneda || 'USD',
        quantity: data.cantidad,
        totalDisponibles: data.totalDisponibles || data.cantidad || 0,
        disponibles: data.disponibles || data.cantidad || 0,
        vendidos: data.vendidos || 0,
        minPorCompra: data.minPorCompra || 1,
        maxPorCompra: data.maxPorCompra || 10,
        fechaInicioVenta: data.fechaInicioVenta,
        fechaFinVenta: data.fechaFinVenta
    };

    const newTicketType = await TicketType.create(ticketTypeData);
    return newTicketType;
};

const getTicketTypesByEventId = async (eventId) => {
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

// Función auxiliar para mapear campos del español al inglés
const mapSpanishToEnglishFields = (data) => {
    const fieldMap = {
        nombre: 'name',
        descripcion: 'description',
        precio: 'price',
        moneda: 'currency',
        cantidad: 'quantity',
        totalDisponibles: 'totalDisponibles',
        vendidos: 'vendidos',
        disponibles: 'disponibles',
        minPorCompra: 'minPorCompra',
        maxPorCompra: 'maxPorCompra',
        fechaInicioVenta: 'fechaInicioVenta',
        fechaFinVenta: 'fechaFinVenta'
    };

    const mappedData = {};
    Object.keys(data).forEach(key => {
        if (fieldMap[key]) {
            mappedData[fieldMap[key]] = data[key];
        }
    });
    
    return mappedData;
};

const updateTicketType = async (eventId, typeId, updateData) => {
    const ticketType = await getTicketTypeById(eventId, typeId);
    if (!ticketType) {
        throw new NotFoundError(`No se encontró un tipo de ticket con ID ${typeId} para el evento ${eventId}`);
    }

    // Mapear campos del español al inglés
    const mappedData = mapSpanishToEnglishFields(updateData);

    // Lógica de negocio: No permitir reducir la cantidad por debajo de los vendidos.
    if (mappedData.quantity) {
        const soldTickets = await OrderItem.sum('quantity', {
            where: { ticketTypeId: typeId }
        });
        if (mappedData.quantity < (soldTickets || 0)) {
            throw new ConflictError(`No se puede reducir la cantidad a ${mappedData.quantity} porque ya se han vendido ${soldTickets} tickets.`);
        }
    }
    
    await ticketType.update(mappedData);
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
    getTicketTypesByEventId,
    getTicketTypeById,
    updateTicketType,
    deleteTicketType,
};