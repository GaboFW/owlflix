const db = require('../config/database.js');

const insertarCarrito = async (usuarioId, psId, precio) => {
    const query = `
        INSERT INTO CARRITO (USUARIO_ID, PS_ID, PRECIO) VALUES (?, ?, ?) 
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
        SELECT C.ID, C.PS_ID, P.TITULO_PS, P.URL_IMAGEN, C.PRECIO, C.CANTIDAD
        FROM CARRITO C
        JOIN PELICULAS_SERIES P ON C.PS_ID = P.ID_PS
        WHERE C.USUARIO_ID = ?
        `;
    const values = [usuarioId];

    const [results] = await db.query(query, values);

    return results;
}

const deleteCarritoId = async (id) => {
    const query = `DELETE FROM CARRITO WHERE USUARIO_ID = ?`;
    const values = [id];

    const [results] = await db.query(query, values);

    return results;
}

const deleteIdItem = async (userId, idItem) => {
    const query = `DELETE FROM CARRITO WHERE USUARIO_ID = ? AND PS_ID = ?`;
    const values = [userId, idItem];
    
    const [results] = await db.query(query, values);

    return results;
}

const putCantidad = async (cantidad, userId, idItem) => {
    const query = `UPDATE CARRITO SET CANTIDAD = ?, PRECIO = CANTIDAD * 1000 WHERE USUARIO_ID = ? AND PS_ID = ?`;
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