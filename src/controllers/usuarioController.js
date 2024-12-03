require('dotenv').config();

const bcrypt = require('bcryptjs');
const { schemaUsuario } = require('../utils/validacion');
const usuarioModel = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, passwd } = schemaUsuario.parse(req.body);

        const usuarioExiste = await usuarioModel.checkUsuario(email);
        if (usuarioExiste.length > 0) {
            return res.status(400).json({ message: "El mail ya existen" });
        }

        const passwdHash = await bcrypt.hash(passwd, 10);

        const result = await usuarioModel.insertarUsuario(nombre, apellido, email, passwdHash);
        res.status(201).json({ status: "success", message: result.insertId });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}

const obtenerNombre = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await usuarioModel.getNombreUser(id);
        
        res.status(201).json(result);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}

const iniciarSesion = async (req, res) => {
    try {
        const { email, passwd } = req.body;

        const usuarioActivo = await usuarioModel.checkUsuario(email);
        if (usuarioActivo.length === 0) {
            return res.status(401).json({ message: "Credenciales no válidas" });
        }

        const usuario = usuarioActivo[0];

        const isMatch = await bcrypt.compare(passwd, usuario.PASSWD);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales no válidas" });
        }

        const token = jwt.sign({ id: usuario.ID }, process.env.SECRET_KEY, { expiresIn: '720h' });

        res.setHeader("Authorization", `Bearer ${token}`);

        res.json({ message: "Inicio de sesión exitoso", userId: usuario.ID_USUARIO, data: token });
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor", details: error.message });
    }
};

const logout = (req, res) => {
    res.status(200).json({ message: "Logout successful" });
}

module.exports = {
    crearUsuario,
    iniciarSesion,
    logout,
    obtenerNombre
};
