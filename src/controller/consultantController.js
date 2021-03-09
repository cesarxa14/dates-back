//const model = require('../schemas/consultantModel');

const express = require("express");
const { ConsultantsService } = require("../services/consultantsService");

function consultantController(app) {
    const router = express.Router();
    app.use("/api/consultants", router);

    const consultantsService = new ConsultantsService();

    router.get( "/" , async function(req, res, next){
        const consultants = consultantsService.getConsultants()
            .then(rows => res.json(rows) )
            .catch(err => console.log(err));

    })
}

module.exports = {
    consultantController
}
