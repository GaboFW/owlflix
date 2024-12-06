const fs = require('fs');
const PDFDocument = require('pdfkit');

const generarPDF = (datos) => {
    const doc = new PDFDocument();
    const filePath = `comprobante_OwlFlix_${Date.now()}.pdf`;

    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(20).text("Comprobante de Compra", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Cliente: ${datos.cliente}`);
    doc.text(`Fecha: ${datos.fecha}`);
    doc.text(`Número de Comprobante: ${datos.numeroComprobante}`);
    doc.moveDown();
    doc.fontSize(14).text("Productos:", { underline: true });

    datos.productos.forEach(producto => {
        doc.fontSize(12).text(`${producto.name} (${producto.cantidad}): $${producto.price}`);
    });

    doc.moveDown();
    doc.fontSize(12).text(`Descuento: $${datos.descuento}`);
    doc.fontSize(14).text(`Total: $${datos.total}`, { align: "right" });
    doc.moveDown();
    doc.fontSize(10).text("Gracias por su compra en Owlflix.", { align: "center" });
    
    doc.end();

    return new Promise((resolve, reject) => {
        doc.on("finish", () => resolve(filePath));
        doc.on("error", reject);
    });
};

module.exports = {
    generarPDF
};
