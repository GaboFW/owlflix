const db = require('../config/database.js');

const peliSeries = async (palabra) => {
    const query = `SELECT ID_PS, TITULO_PS, URL_IMAGEN, CATEGORIA, SINOPSIS FROM PELICULAS_SERIES WHERE TITULO_PS LIKE ? AND ID_PS NOT IN (2004, 2005, 2006)`;
    const values = [`%${palabra}%`];
    
    const [results] = await db.query(query, values);

    return results;
}

const updateSinopsis = async (sinopsis, id) => {
    const query = `UPDATE PELICULAS_SERIES SET SINOPSIS = ? WHERE ID_PS = ?`;
    const values = [sinopsis, id];

    const [results] = await db.query(query, values);

    return results;
}

module.exports = {
    peliSeries,
    updateSinopsis
};