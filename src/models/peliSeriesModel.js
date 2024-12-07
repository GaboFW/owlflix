const db = require('../config/database.js');

const peliSeries = async (palabra) => {
    const query = `SELECT id_ps, titulo_ps, url_imagen, categoria, sinopsis FROM peliculas_series WHERE titulo_ps LIKE ? AND id_ps NOT IN (2004, 2005, 2006)`;
    const values = [`%${palabra}%`];
    
    const [results] = await db.query(query, values);

    return results;
}

const updateSinopsis = async (sinopsis, id) => {
    const query = `UPDATE peliculas_series SET sinopsis = ? WHERE id_ps = ?`;
    const values = [sinopsis, id];

    const [results] = await db.query(query, values);

    return results;
}

module.exports = {
    peliSeries,
    updateSinopsis
};