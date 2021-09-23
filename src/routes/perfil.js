const { Router } = require('express');
const router = Router();
const { obtenerPerfil } = require('../controllers/perfilController');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get( '/', [authMiddleware], obtenerPerfil);

module.exports = router;