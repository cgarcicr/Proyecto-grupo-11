const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { obtenerPerfil, editarPerfil } = require('../controllers/perfilController');
const authMiddleware = require('../../middlewares/authMiddleware');

const validacionFormEditarPerfil = [
    body('nombre').notEmpty().withMessage('El campo nombre no debe estar vacío.'),
    body('apellido').notEmpty().withMessage('El campo apellido no debe estar vacío.'),
    body('email').notEmpty().withMessage('El campo correo no debe estar vacío.'),
    body('email').isEmail().withMessage('El formato del correo es incorrecto.'),
    body('fecha_nacimiento').notEmpty().withMessage('La fecha de nacimiento es obligatoria.')
]

router.get( '/', [authMiddleware], obtenerPerfil);
router.put( '/editarPerfil', [validacionFormEditarPerfil], editarPerfil);

module.exports = router;