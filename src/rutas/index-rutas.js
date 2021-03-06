const {Router} = require('express');
const router = Router();
const Auth = require('../auth/index-auth')
const controller = require('../controller/index-controller');


router.post('/login', controller.login);

/*
router.get('/home', Auth.ensureToken, controller.login())
aqui iran las rutas post, get, delete, update, etc

*/
module.exports = router;
