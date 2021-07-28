const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const guestMiddleware = require('../../middlewares/guestMiddleware');
const { nuevoRegistro, crearRegistro, perfil } = require('../controllers/registroController');

const validacionFormRegistro = [
    body('nombre').notEmpty().withMessage('El campo nombre no debe estar vacío.'),
    body('apellido').notEmpty().withMessage('El campo apellido no debe estar vacío.'),
    body('correo').notEmpty().withMessage('El campo correo no debe estar vacío.'),
    body('correo').isEmail().withMessage('El formato del correo es incorrecto.'),
    body('contrasenia').notEmpty().withMessage('El campo contraseña no debe estar vacío.'),
    body('fechaNacimiento').notEmpty().withMessage('La fecha de nacimiento no debe estar vacío.'),
]

router.get( '/', nuevoRegistro );
router.post( '/', validacionFormRegistro, crearRegistro );
router.get( '/perfilUsuario', perfil);

module.exports = router;