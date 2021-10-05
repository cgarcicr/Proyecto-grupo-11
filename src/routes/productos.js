const { Router } = require('express');
const router = Router();
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../../middlewares/authMiddleware');
const { nuevoProducto, editarProducto, listarProductos, obtenerProducto, crearProducto, modificarProducto, borrarProducto  } = require('../controllers/productsController');

//Uso de multer para subir archivos al server
const storage = multer.diskStorage({
    destination: ( req, file, cb)=>{
        cb( null, path.join( __dirname, '../../public/images/imagesProductos' ) );
    },
    filename: ( req, file, cb)=>{
        const newFileName = 'producto-' + Date.now() + path.extname( file.originalname );
        cb( null, newFileName);
    }
});

const upload = multer({ storage: storage })

const validacionFormCrearProducto = [
    body('nombre').notEmpty().withMessage('El campo nombre no debe estar vacío.'),
    body('descripcion').notEmpty().withMessage('El campo descripcion no debe estar vacío.'),
    // body('precio').notEmpty().withMessage('El precio no debe estar vacío.'),
    body('precio').isFloat().withMessage('El campo no debe estar vacío y debe ser numérico'),
    body('stock').notEmpty().withMessage('La cantidad no debe estar vacío.'),
    body('id_categoria').isInt().withMessage('Debe seleccionar una opción')
]

// router.get( '/listarProductos', listarProductos );
router.get( '/obtenerProducto/:id', obtenerProducto );
router.get( '/',[authMiddleware],  nuevoProducto );
router.post( '/', [upload.single('imagen'), validacionFormCrearProducto], crearProducto );
// router.get( '/editarProducto/:id', editarProducto );
// router.put( '/editarProducto', modificarProducto );
// router.delete( '/borrarProducto/:id', borrarProducto);

module.exports = router;