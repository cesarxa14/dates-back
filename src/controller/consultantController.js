//const model = require('../schemas/consultantModel');

const express = require("express");
const { ConsultantsService } = require("../services/consultantsService");

const {
    consultantIdSchema,
    createConsultantSchema,
    updateConsultantSchema
} = require('../utils/schemas/consultant')

const { validationHandler } = require('../utils/middleware/validationHandler')

function consultantController(app) {
    const router = express.Router();
    app.use("/api/consultants", router);

    const consultantsService = new ConsultantsService();

    router.get( "/" , async function(req, res, next){
        const consultants = consultantsService.getConsultants()
            .then(rows => res.json(rows) )
            .catch(err => console.log(err));

    })

    router.post( "/" , validationHandler(createConsultantSchema) , function(req, res, next){
        const { body: consultant } = req;

        const createdConsultant = consultantsService.createConsultant({consultant})
            .then(row => res.status(200).json({
                message: "Consultant created successfully"
            }) )
            .catch(err => console.log(err));

    })
}

module.exports = {
    consultantController
}
