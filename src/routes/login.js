const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const { obtenerLogin, procesarLogin } = require('../controllers/loginController');
const guestMiddleware = require('../../middlewares/guestMiddleware');

let validacionLogin = [
    body('email').isEmail().withMessage('Correo inválido'),
    body('contrasenia').isLength({min:5}).withMessage('La contraseña debe tener mínimo 5 caracteres')
]

router.get( '/', [ guestMiddleware ], obtenerLogin );
router.post( '/', validacionLogin, procesarLogin );

module.exports = router;