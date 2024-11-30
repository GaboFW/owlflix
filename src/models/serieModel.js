const db = require('../config/database.js');

const series = async (page, limit) => {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM peliculas_series WHERE CATEGORIA = ? LIMIT ? OFFSET ?`;
    const values = ['SERIE', limit, offset];

    const [results] = await db.query(query, values);

    return results;
};

const seriesId = async (id) => {
    const query = `
        SELECT ID_PS, TITULO_PS, URL_IMAGEN, CATEGORIA, SINOPSIS, 
        DATE_FORMAT(FECHA_LANZAMIENTO, '%Y-%m-%d') AS FECHA_LANZAMIENTO
        FROM peliculas_series
        WHERE CATEGORIA = 'SERIE' AND ID_PS = ?
        `;

    const [results] = await db.query(query, id);

    return results;
}

module.exports = { 
    series,
    seriesId
};

