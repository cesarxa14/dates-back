const express = require('express');
const router = express.Router();
const { ConsultantController } = require('../controller/consultantController');
const {validationHandler} = require("../utils/middleware/validationHandler");
const {
    consultantIdSchema,
    createConsultantSchema,
    updateConsultantSchema
} = require("../utils/schemas/consultant");



function apiConsultants(app) {
    app.use("/api/consultants", router);
    const consultantController = new ConsultantController();

    //Rutas de Consultas
    router.post('/creatConsultant', consultantController.createConsults02)
    router.get( "/getConsultantsByIdAdviser", consultantController.getConsultantsByIdAdviser);

    router.get( "/:consultantId"    , validationHandler({consultantId: consultantIdSchema},'params')
                                                     , consultantController.getConsultantById);

    router.get("/", consultantController.getAllConsultants);

    router.post("/"                  , validationHandler(createConsultantSchema)
                                                     ,consultantController.createConsultant);

    router.put("/:consultantId"     , validationHandler({consultantId: consultantIdSchema},'params')
                                                     , validationHandler(updateConsultantSchema)
                                                     , consultantController.updateConsultantById);

    router.delete("/:consultantId"   , validationHandler({consultantId: consultantIdSchema},'params')
                                                     , consultantController.deleteConsultantById);
}

module.exports = {
    apiConsultants
};
