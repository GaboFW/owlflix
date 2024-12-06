const db = require('../config/database.js');

const insertarCarrito = async (usuarioId, psId, precio) => {
    const query = `
        INSERT INTO carrito (USUARIO_ID, PS_ID, PRECIO) VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE
        cantidad = cantidad + 1,
        precio = VALUES(precio) * (cantidad)
        `;
    const values = [usuarioId, psId, precio];

    const [results] = await db.query(query, values);

    return results;
}

const getCarritoId = async (usuarioId) => {
    const query = `
        SELECT C.id, C.ps_id, P.titulo_ps, P.url_imagen, C.precio, C.cantidad
        FROM carrito C
        JOIN peliculas_series P ON C.ps_id = P.id_ps
        WHERE C.usuario_id = ?
        `;
    const values = [usuarioId];

    const [results] = await db.query(query, values);

    return results;
}

const deleteCarritoId = async (id) => {
    const query = `DELETE FROM carrito WHERE usuario_id = ?`;
    const values = [id];

    const [results] = await db.query(query, values);

    return results;
}

const deleteIdItem = async (userId, idItem) => {
    const query = `DELETE FROM carrito WHERE usuario_id = ? AND ps_id = ?`;
    const values = [userId, idItem];
    
    const [results] = await db.query(query, values);

    return results;
}

const putCantidad = async (cantidad, userId, idItem) => {
    const query = `UPDATE carrito SET cantidad = ?, precio = cantidad * 1000 WHERE usuario_id = ? AND ps_id = ?`;
    const values = [cantidad, userId, idItem];

    const [results] = await db.query(query, values);

    return results;
}

module.exports = {
    insertarCarrito,
    getCarritoId,
    deleteCarritoId,
    deleteIdItem,
    putCantidad
};