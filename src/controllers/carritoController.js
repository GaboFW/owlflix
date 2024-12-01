const carritoModel = require('../models/carritoModel');

const insertarCarrito = async (req, res) => {
    try {
        const { usuarioId, psId } = req.body;

        const results = await carritoModel.insertarCarrito(usuarioId, psId);

        res.status(201).json({ id: results.insertId });
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const obtenerCarritoId = async (req, res) => {
    try {
        const id = req.params;

        const results = await carritoModel.getCarritoId(id);

        res.status(201).json(results);
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const obtenerUsuario = async (req, res) => {
    try {
        const usuarioId = req.params;

        const results = await carritoModel.getUsuario(usuarioId);

        res.status(201).json(results);
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const eliminarCarritoId = async (req, res) => {
    try {
        const id = req.params;

        const results = await carritoModel.deleteCarritoId(id);

        res.status(201).json(results);
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    insertarCarrito,
    obtenerCarritoId,
    obtenerUsuario,
    eliminarCarritoId
};