const express = require('express');
const router = express.Router();
const { generarComprobante } = require('../controllers/comprobanteController');

router.post('/', generarComprobante);

module.exports = router;