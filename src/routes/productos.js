const { Router } = require('express');
const router = Router();
const { nuevoProducto, editarProducto, listarProductos, obtenerProducto  } = require('../controllers/productsController');

router.get( '/', listarProductos );
router.get( '/obtenerProducto/:id', obtenerProducto )
router.get( '/nuevoProducto', nuevoProducto );
router.get( '/editarProducto', editarProducto )

module.exports = router;