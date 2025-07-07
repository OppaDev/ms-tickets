const express = require('express');
const ticketTypeRoutes = require('./ticketType.routes');

const router = express.Router();

router.use('/events/:eventId/ticket-types', ticketTypeRoutes);

module.exports = router;
