const express = require('express');
const router = express.Router();
const { traerPeliSeries } = require('../controllers/peliSeriesController');

router.get('/:palabra', traerPeliSeries);

module.exports = router;