const { Router } = require('express');
const router = Router();
const { verBolsa, agregarProductoBolsa, eliminarProductoBolsa } = require('../controllers/bolsaController');
const authMiddleware = require('../../middlewares/authMiddleware');


router.get( '/',[ authMiddleware ], verBolsa );
router.get( '/agregarProducto/:id', [authMiddleware], agregarProductoBolsa );
router.get( '/eliminarProducto/:id', eliminarProductoBolsa)
// router.get( '/editarProducto/:id', editarProducto );
// router.put( '/editarProducto', modificarProducto );
// router.delete( '/borrarProducto/:id', borrarProducto);

module.exports = router;