const express = require('express');
const router = express.Router();
const { ConsultantController } = require('../controller/consultantController');
const {validationHandler} = require("../utils/middleware/validationHandler");
const upload = require('../config/multer.config');
const {
    consultantIdSchema,
    createConsultantSchema,
    updateConsultantSchema
} = require("../utils/schemas/consultant");



function apiConsultants(app) {
    app.use("/api/consultants", router);
    const consultantController = new ConsultantController();

    //Rutas de Consultas
    router.get( "/getConsultasByAsesor", consultantController.getConsultasByAsesor);

    router.post('/crearConsulta', upload.single('fotoConsulta'), consultantController.crearConsulta);

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

module.exports = {
    apiConsultants
};