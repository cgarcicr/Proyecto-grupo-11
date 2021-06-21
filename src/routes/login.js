const { Router } = require('express');
const router = Router();
const { obtenerLogin } = require('../controllers/loginController');

router.get( '/', [], obtenerLogin );

module.exports = router;