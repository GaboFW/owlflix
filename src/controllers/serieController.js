const serieModel = require('../models/serieModel');

const traerSeries = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;

        const results = await serieModel.series(page, limit);

        res.status(201).json(results);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const traerSeriesId = async (req, res) => {
    try {
        const id = req.params.id;
        
        const results = await serieModel.seriesId(id);

        res.status(201).json(results);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    traerSeries,
    traerSeriesId
};