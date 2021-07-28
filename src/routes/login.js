const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { obtenerLogin, procesarLogin } = require('../controllers/loginController');

let validacionLogin = [
    body('correo').isEmail().withMessage('Correo inválido'),
    body('contrasenia').isLength({min:5}).withMessage('La contraseña debe tener mínimo 5 caracteres')
]

router.get( '/', [], obtenerLogin );
router.post( '/', validacionLogin, procesarLogin );

module.exports = router;