const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

router.get('/:id', generoController.traerGeneroId);

module.exports = router;