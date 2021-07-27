const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const { nuevoProducto, editarProducto, listarProductos, obtenerProducto, crearProducto, modificarProducto, borrarProducto  } = require('../controllers/productsController');

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

router.get( '/', listarProductos );
router.get( '/obtenerProducto/:id', obtenerProducto );
router.get( '/nuevoProducto', nuevoProducto );
router.post( '/nuevoProducto', upload.single('imagenProducto'), crearProducto );
router.get( '/editarProducto/:id', editarProducto );
router.put( '/editarProducto', modificarProducto );
router.delete( '/borrarProducto/:id', borrarProducto);

module.exports = router;