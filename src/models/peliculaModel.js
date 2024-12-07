const db = require('../config/database.js');

const peliculas = async (limit, offset) => {
    const query = `SELECT * FROM peliculas_series WHERE categoria = ? AND id_ps NOT IN (2004, 2005, 2006) LIMIT ? OFFSET ?`;
    const values = ['PELICULA', limit, offset];

    const [results] = await db.query(query, values);

    return results;
};

const peliculasId = async (id) => {
    const query = `
        SELECT ID_PS, TITULO_PS, URL_IMAGEN, CATEGORIA, SINOPSIS, 
        DATE_FORMAT(FECHA_LANZAMIENTO, '%Y-%m-%d') AS FECHA_LANZAMIENTO
        FROM peliculas_series
        WHERE categoria = 'PELICULA' AND id_ps = ? AND id_ps NOT IN (2004, 2005, 2006)
        `;

    const [results] = await db.query(query, id);

    return results;
}

module.exports = { 
    peliculas,
    peliculasId
};

