const { Router } = require('express');
const router = Router();
const { obtenerRegistro } = require('../controllers/registroController');

router.get( '/', [], obtenerRegistro );

module.exports = router;