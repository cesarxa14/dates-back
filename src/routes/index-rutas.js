const {Router} = require('express');
const router = Router();
const Auth = require('../auth/index-auth')
const controller = require('../controller/index-controller');
const consultantController = require('../controller/consultantController');


router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/verificacionEmail', controller.verificacionEmail);
router.get('/verifyEmail/:token', controller.verificarTokenEmail);

router.get('/getEspecialidad', controller.getEspecialidad);


/*
router.get('/home', Auth.ensureToken, controller.login())
aqui iran las routes post, get, delete, update, etc

*/
module.exports = router;
