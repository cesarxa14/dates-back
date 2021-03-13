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
            .catch(err => next(err));

    })

    router.get( "/:consultantId" ,validationHandler({consultantId: consultantIdSchema},'params'),  function(req, res, next){
        const { consultantId } = req.params;

        const consultant = consultantsService.getConsultantById(consultantId)
            .then(row => row.length > 0 ? res.status(200).json({
                data: row
            }): res.status(200).json({
                message: "Consultant id does not exist"
            }))
            .catch(err => next(err));

    })

    router.post( "/" , validationHandler(createConsultantSchema) , function(req, res, next){
        const { body: consultant } = req;

        const createdConsultant = consultantsService.createConsultant({consultant})
            .then(row => res.status(201).json({
                message: "Consultant created successfully"
            }) )
            .catch(err => next(err));

    })

    router.put( "/:consultantId" ,validationHandler({consultantId: consultantIdSchema},'params'), validationHandler(updateConsultantSchema) , function(req, res, next){
        const { consultantId } = req.params;
        const { body: consultant } = req;

        const updatedConsultant = consultantsService.updateConsultant(consultantId, { consultant })
            .then(row => res.status(202).json({
                message: "Consultant updated successfully",
                data: row
            }) )
            .catch(err => next(err));

    })

    router.delete("/:consultantId", validationHandler({consultantId: consultantIdSchema}, 'params'), function(req,res,next){
       const { consultantId } = req.params;

       const deletedConsultant = consultantsService.deleteConsultant(consultantId)
           .then(value => res.status(200).json({
               message: "Consultant deleted successfully",
               data: value
           }))
           .catch(err => next(err));
    });


}

module.exports = {
    consultantController
}
