const express = require('express');
const router = express.Router();

function apiAuth(app) {
    app.use('/api/auth', router);

    const {AuthController} = require('../controller/authController');
    const authController = new AuthController();

    router.post('/login', authController.login);
    router.post('/register', authController.register);
    router.post('/verificacionEmail', authController.verificacionEmail);
    router.get('/verifyEmail/:token', authController.verificarTokenEmail);


}

module.exports = {apiAuth};