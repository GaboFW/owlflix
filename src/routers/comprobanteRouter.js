const express = require('express');
const router = express.Router();
const { generarComprobante } = require('../controllers/comprobanteController');
const { authenticationToken } = require('../middleware/auth');

router.post('/', authenticationToken, generarComprobante);

module.exports = router;