const {Router} = require('express');
const router = Router();
const Auth = require('../auth/index-auth')
const controller = require('../controller/index-controller');
const { ConsultantController } = require('../controller/consultantController');
const express = require("express");
const {validationHandler} = require("../utils/middleware/validationHandler");
const fdf = require('../config/multer.config');
const {
    consultantIdSchema,
    createConsultantSchema,
    updateConsultantSchema
} = require("../utils/schemas/consultant");

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/verificacionEmail', controller.verificacionEmail);
router.get('/verifyEmail/:token', controller.verificarTokenEmail);

router.get('/getEspecialidad', controller.getEspecialidad);


/*
router.get('/home', Auth.ensureToken, controller.login())
aqui iran las routes post, get, delete, update, etc

*/


function api(app) {
    const router = express.Router();
    app.use("/api", router);
    const consultantController = new ConsultantController();

    //Rutas de Consultas
    router.get( "/consultants/"                 , consultantController.getAllConsultants);

    router.get( "/consultants/:consultantId"    , validationHandler({consultantId: consultantIdSchema},'params')
                                                     , consultantController.getConsultantById);

    router.post("/consultants"                  , validationHandler(createConsultantSchema)
                                                     , consultantController.createConsultant);

    router.put("/consultants/:consultantId"     , validationHandler({consultantId: consultantIdSchema},'params')
                                                     , validationHandler(updateConsultantSchema)
                                                     , consultantController.updateConsultantById);

    router.delete("/consultants/:consultantId"   , validationHandler({consultantId: consultantIdSchema},'params')
                                                     , consultantController.deleteConsultantById);
}
const consultantController = new ConsultantController();
router.get( "/" , consultantController.getAllConsultants);
module.exports = {
    router,
    api
};
