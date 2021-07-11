const { Router } = require('express');
const router = Router();
const { nuevoProducto, editarProducto, listarProductos, obtenerProducto, crearProducto  } = require('../controllers/productsController');

router.get( '/', listarProductos );
router.get( '/obtenerProducto/:id', obtenerProducto );
router.get( '/nuevoProducto', nuevoProducto );
router.post( '/nuevoProducto', crearProducto );
router.get( '/editarProducto', editarProducto );

module.exports = router;