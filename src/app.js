require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

/*ME QUIERO PEGAR UN TIRO! :)*/

const peliculaRouter = require('./routers/peliculaRouter');
const serieRouter = require('./routers/serieRouter');
const generoRouter = require('./routers/generoRouter');
const usuarioRouter = require('./routers/usuarioRouter');
const carritoRouter = require('./routers/carritoRouter');
const carritoDetalleRouter = require('./routers/carritoDetalleRouter');

app.use('/peliculas', peliculaRouter);
app.use('/series', serieRouter);
app.use('/genero', generoRouter);
app.use('/usuario', usuarioRouter);
app.use('/carrito', carritoRouter);
app.use('/carritoDetalle', carritoDetalleRouter)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});