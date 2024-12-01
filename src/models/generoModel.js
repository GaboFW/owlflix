const db = require('../config/database.js');

const generoId = async (id) => {
    const query = `
        SELECT nombre
        FROM genero
        JOIN generos_peliculas_series ON genero.ID_GEN = generos_peliculas_series.ID_GENERO
        WHERE generos_peliculas_series.ID_PS = ?
        `;
    
    const [results] = await db.query(query, id);

    return results;
}

module.exports = { generoId };