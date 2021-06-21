const { Router } = require('express');
const router = Router();
const { productosController } = require('../controllers/productosController');

router.get( '/nuevoProducto', productosController.nuevoProducto);
router.get('/editProducto', productosController.editProducto)

module.exports = router;