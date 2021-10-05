const { Router } = require('express');
const router = Router();
const { listarProductos  } = require('../controllers/productsController');

router.get( '/:id', listarProductos );
// router.get( '/obtenerProducto/:id', obtenerProducto );
// router.get( '/editarProducto/:id', editarProducto );
// router.put( '/editarProducto', modificarProducto );
// router.delete( '/borrarProducto/:id', borrarProducto);

module.exports = router;