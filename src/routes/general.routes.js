const express = require('express');
const router = express.Router();

function apiGeneral(app){
    app.use('/api/general', router);

    const {GeneralController} = require('../controller/generalController');
    const generalController = new GeneralController();

    router.get('/getEspecialidades', generalController.getEspecialidad);
    router.post('/switchedAsesorStatus', generalController.switchedAsesorStatus);
}

module.exports = { apiGeneral }