const generoModel = require('../models/generoModel');

const traerGeneroId = async (req, res) => {
    try {
        const id = req.params.id;

        const results = await generoModel.generoId(id);

        res.status(201).json(results);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = { traerGeneroId };
