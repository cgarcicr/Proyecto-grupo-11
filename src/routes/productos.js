const { Router } = require('express');
const router = Router();
const { nuevoProducto, editarProducto, listarProductos, obtenerProducto, crearProducto, modificarProducto  } = require('../controllers/productsController');

router.get( '/', listarProductos );
router.get( '/obtenerProducto/:id', obtenerProducto );
router.get( '/nuevoProducto', nuevoProducto );
router.post( '/nuevoProducto', crearProducto );
router.get( '/editarProducto/:id', editarProducto );
router.put( '/editarProducto', modificarProducto );

module.exports = router;