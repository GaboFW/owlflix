const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController.js');

router.get('/', peliculaController.traerPeliculas);
router.get('/:id', peliculaController.traerPeliculasId);

module.exports = router;