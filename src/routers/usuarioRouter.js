const express = require('express');
const router = express.Router();
const { crearUsuario, iniciarSesion, logout, obtenerNombre } = require('../controllers/usuarioController');
const { authenticationToken } = require('../middleware/auth');

router.post('/registro', crearUsuario);
router.post('/login', iniciarSesion);
router.get('/session', authenticationToken);
router.post('/logout', authenticationToken, logout);
router.get('/:id', obtenerNombre);

module.exports = router;
