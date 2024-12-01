const db = require('../config/database.js');

const insertarCarrito = async (usuarioId, psId) => {
    const query = `
        INSERT INTO carrito (USUARIO_ID, PS_ID) VALUES (?, ?) 
        ON DUPLICATE KEY UPDATE
        cantidad = cantidad + 1,
        precio = VALUES(precio) * (cantidad + 1)
        `;
    const values = [usuarioId, psId];

    const [results] = await db.query(query, values);

    return results;
}

const getCarritoId = async (usuarioId) => {
    const query = `
    SELECT C.id, P.titulo_ps, P.url_imagen, C.precio, C.cantidad
    FROM carrito C
    JOIN peliculas_series P ON C.ps_id = P.id_ps
    WHERE C.usuario_id = ?`;
    const values = [usuarioId];

    const [results] = await db.query(query, values);

    return results;
}

const getUsuario = async (usuarioId) => {
    const query = `SELECT usuario_id FROM CARRITO WHERE usuario_id = ?`;
    const values = [usuarioId];

    const [results] = await db.query(query, values);

    return results;
}

const deleteCarritoId = async (id) => {
    const query = `DELETE FROM carrito WHERE id = ?`;
    const values = [itemId];

    const [results] = await db.query(query, values);

    return results;
}

module.exports = {
    insertarCarrito,
    getCarritoId,
    getUsuario,
    deleteCarritoId
};