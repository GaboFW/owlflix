const peliculaModel = require('../models/peliculaModel.js');

const traerPeliculas = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        
        const limit = 20;
        const offset = (page - 1) * limit;

        const results = await peliculaModel.peliculas(limit, offset);

        res.status(201).json(results);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const traerPeliculasId = async (req, res) => {
    try {
        const id = req.params.id;

        const results = await peliculaModel.peliculasId(id);
        
        res.status(201).json(results);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    traerPeliculas,
    traerPeliculasId
};
