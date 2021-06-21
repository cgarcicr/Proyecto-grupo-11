const { Router } = require('express');
const router = Router();
const { productsController } = require('../controllers/productsController');

router.get( '/nuevoProducto', productsController.nuevoProducto);
router.get('/editProducto', productsController.editProducto)

module.exports = router;