require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

// const path = require('path');
// app.use(express.static(path.join(__dirname, '../')));

const corsOptions = {
    origin: 'https://owlflix.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

const peliculaRouter = require('./routers/peliculaRouter');
const serieRouter = require('./routers/serieRouter');
const generoRouter = require('./routers/generoRouter');
const usuarioRouter = require('./routers/usuarioRouter');
const carritoRouter = require('./routers/carritoRouter');
const comprobanteRouter = require('./routers/comprobanteRouter');
const peliSeriesRouter = require('./routers/peliSeriesRouter');

app.use('/peliculas', peliculaRouter);
app.use('/series', serieRouter);
app.use('/genero', generoRouter);
app.use('/usuario', usuarioRouter);
app.use('/carrito', carritoRouter);
app.use('/comprobante', comprobanteRouter);
app.use('/peliculas-series', peliSeriesRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});