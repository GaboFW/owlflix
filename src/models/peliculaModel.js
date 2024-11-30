const db = require('../config/database.js');

const peliculas = async (limit, offset) => {
    const query = `SELECT * FROM peliculas_series WHERE CATEGORIA = ? LIMIT ? OFFSET ?`;
    const values = ['PELICULA', limit, offset];

    const [results] = await db.query(query, values);

    return results;
};

const peliculasId = async (id) => {
    const query = `
        SELECT ID_PS, TITULO_PS, URL_IMAGEN, CATEGORIA, SINOPSIS, 
        DATE_FORMAT(FECHA_LANZAMIENTO, '%Y-%m-%d') AS FECHA_LANZAMIENTO
        FROM peliculas_series
        WHERE CATEGORIA = 'PELICULA' AND ID_PS = ?
        `;

    const [results] = await db.query(query, id);

    return results;
}

module.exports = { 
    peliculas,
    peliculasId
};

