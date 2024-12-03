const peliSeriesModel = require('../models/peliSeriesModel');

const traerPeliSeries = async (req, res) => {
    try {
        const { palabra } = req.params;

        const results = await peliSeriesModel.peliSeries(palabra);

        res.status(201).json(results);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}

module.exports = {
    traerPeliSeries
};