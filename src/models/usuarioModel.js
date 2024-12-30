const db = require('../config/database.js');

const insertarUsuario = async (nombre, apellido, email, passwd) => {
    const query = `INSERT INTO USUARIO (NOMBRE, APELLIDO, EMAIL, PASSWD) VALUES (?, ?, ?, ?)`;
    const values = [nombre, apellido, email, passwd];
    
    const [results] = await db.query(query, values);

    return results;
}

const checkUsuario = async (email) => {
    const query = `SELECT * FROM USUARIO WHERE EMAIL = ?`;
    const values = [email];

    const [results] = await db.query(query, values);

    return results;
}

const getNombreUser = async (id) => {
    const query = `SELECT NOMBRE FROM USUARIO WHERE ID = ?`;
    const values = [id];

    const [results] = await db.query(query, values);

    return results;
}

module.exports = {
    insertarUsuario,
    checkUsuario,
    getNombreUser
};