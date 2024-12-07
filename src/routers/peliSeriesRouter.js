const express = require('express');
const router = express.Router();
const { traerPeliSeries, actualizarSinopsis } = require('../controllers/peliSeriesController');

router.get('/:palabra', traerPeliSeries);
router.put('/:id/sinopsis', actualizarSinopsis);

module.exports = router;