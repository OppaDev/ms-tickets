const express = require('express');
const ticketTypeRoutes = require('./ticketType.routes');

const router = express.Router();

router.use('/eventos/:eventoId/tipos-ticket', ticketTypeRoutes);

module.exports = router;
