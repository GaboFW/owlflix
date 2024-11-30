const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController.js');

router.get('/:id', generoController.traerGeneroId);

module.exports = router;