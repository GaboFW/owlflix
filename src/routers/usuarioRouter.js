const express = require('express');
const router = express.Router();
const { crearUsuario, iniciarSesion, logout } = require('../controllers/usuarioController');
const { authenticationToken } = require('../middleware/auth');

router.post('/registro', crearUsuario);
router.post('/login', iniciarSesion);
router.get('/session', authenticationToken);
router.post('/logout', authenticationToken, logout);

module.exports = router;