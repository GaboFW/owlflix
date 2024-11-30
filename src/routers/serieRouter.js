const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serieController.js');

router.get('/', serieController.traerSeries);
router.get('/:id', serieController.traerSeriesId);

module.exports = router;