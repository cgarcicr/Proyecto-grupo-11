const { Router } = require('express');
const router = Router();
const productsController = require('../controllers/productsController');

router.get( '/nuevoProducto', productsController.nuevoProducto );
router.get( '/editarProducto', productsController.editarProducto )

module.exports = router;