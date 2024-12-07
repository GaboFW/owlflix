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

const actualizarSinopsis = async (req, res) => {
    try {
        const { id } = req.params;
        const { sinopsis } = req.body;

        const results = await peliSeriesModel.updateSinopsis(sinopsis, id);

        if (results.affectedRows > 0) {
            res.status(201).json({ message: "success" });
        } else {
            res.status(404).json({ message: "Error en la actualizacion" });
        }
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}

module.exports = {
    traerPeliSeries,
    actualizarSinopsis
};