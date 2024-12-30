const db = require('../config/database.js');

const generoId = async (id) => {
    const query = `
        SELECT nombre
        FROM GENERO
        JOIN GENEROS_PELICULAS_SERIES ON GENERO.ID_GEN = GENEROS_PELICULAS_SERIES.ID_GENERO
        WHERE GENEROS_PELICULAS_SERIES.ID_PS = ?
        `;
    
    const [results] = await db.query(query, id);

    return results;
}

module.exports = { generoId };