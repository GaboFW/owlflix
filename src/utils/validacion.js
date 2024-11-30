const zod = require('zod');

const schemaUsuario = zod.object({
    nombre: zod.string().min(3, 'El nombre debe tener minimo 3 caracteres'),
    apellido: zod.string().min(3, 'El apellido debe tener minimo 3 caracteres'),
    email: zod.string().email('Formato no correcto'),
    passwd: zod.string().min(8, 'La contrasenia debe tener minimo 8 caracteres')
});

module.exports = {
    schemaUsuario
};