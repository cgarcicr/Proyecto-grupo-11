const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const guestMiddleware = require('../../middlewares/guestMiddleware');
const { nuevoRegistro, crearRegistro, perfil } = require('../controllers/registroController');

//Uso de multer para subir archivos al server
const storage = multer.diskStorage({
    destination: ( req, file, cb)=>{
        cb( null, path.join( __dirname, '../../public/images/imagesUsuarios' ) );
    },
    filename: ( req, file, cb)=>{
        const newFileName = 'usuario-' + Date.now() + path.extname( file.originalname );
        cb( null, newFileName);
    }
});

const upload = multer({ storage: storage })

const validacionFormRegistro = [
    body('nombre').notEmpty().withMessage('El campo nombre no debe estar vacío.'),
    body('apellido').notEmpty().withMessage('El campo apellido no debe estar vacío.'),
    body('email').notEmpty().withMessage('El campo correo no debe estar vacío.'),
    body('email').isEmail().withMessage('El formato del correo es incorrecto.'),
    body('contrasenia').notEmpty().withMessage('El campo contraseña no debe estar vacío.'),
    body('contrasenia2').notEmpty().withMessage('El campo confirmar contraseña no debe estar vacío.')
]

router.get( '/', [ guestMiddleware ], nuevoRegistro );
router.post( '/', [ upload.single('imagenAvatar'), validacionFormRegistro ], crearRegistro );
router.get( '/perfilUsuario', perfil);

module.exports = router;