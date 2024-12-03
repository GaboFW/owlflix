const fs = require('fs');
const { generarPDF } = require('../models/comprobanteModel');

const generarComprobante = async (req, res) => {
    try {
        const datos = req.body;
        const filePath = await generarPDF(datos);

        res.download(filePath, 'comprobante.pdf', (err) => {
            if (err) {
                return res.status(500).send('Error al generar el comprobante.');
            }

            fs.unlinkSync(filePath);
        });
    } catch (error) {
        res.status(500).send('Error interno del servidor.');
    }
};

module.exports = {
    generarComprobante
};
