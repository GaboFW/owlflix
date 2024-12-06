const carritoModel = require('../models/carritoModel');

const insertarCarrito = async (req, res) => {
    try {
        const { usuarioId, psId, precio } = req.body;

        const results = await carritoModel.insertarCarrito(usuarioId, psId, precio);

        res.status(201).json({ id: results.insertId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const obtenerCarritoId = async (req, res) => {
    try {
        const { id } = req.params;

        const results = await carritoModel.getCarritoId(id);

        res.status(201).json(results);
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const eliminarCarritoId = async (req, res) => {
    try {
        const { id } = req.params;

        const results = await carritoModel.deleteCarritoId(id);

        res.status(201).json({ result: results.affectedRows });
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const eliminarIdItem = async (req, res) => {
    try {
        const { userId, idItem } = req.params;

        const results = await carritoModel.deleteIdItem(userId, idItem);

        res.status(201).json({ result: results.affectedRows });
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

const putCantidad = async (req, res) => {
    try {
        const { userId, idItem } = req.params;
        const { cantidad } = req.body;
        
        const results = await carritoModel.putCantidad(cantidad, userId, idItem);

        res.status(201).json({ results: results.affectedRows });
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    insertarCarrito,
    obtenerCarritoId,
    eliminarCarritoId,
    eliminarIdItem,
    putCantidad
};