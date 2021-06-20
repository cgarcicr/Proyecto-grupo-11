const { Router } = require('express');
const router = Router();
const { obtenerMain } = require('../controllers/mainController');

router.get( '/', [], obtenerMain);

module.exports = router;