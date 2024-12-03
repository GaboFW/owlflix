const db = require('../config/database.js');

const peliSeries = async (palabra) => {
    const query = `SELECT id_ps, titulo_ps, url_imagen, categoria, sinopsis FROM peliculas_series WHERE titulo_ps LIKE ?`;
    const values = [`%${palabra}%`];
    
    const [results] = await db.query(query, values);

    return results;
}

module.exports = {
    peliSeries
};