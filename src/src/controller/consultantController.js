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

    router.get( "/:consultantId" ,validationHandler({consultantId: consultantIdSchema},'params'),
                                        async function(req, res, next){
        const { consultantId } = req.params;

        const consultant = consultantsService.getConsultantById(consultantId)
            .then(row => {
                res.status(200).json({
                    message: "Consultant gets successfully",
                    data: row,
                })
            })
            .catch(err => next(err));

    })

    router.post( "/" , validationHandler(createConsultantSchema),
                            async function(req, res, next){
        const { body: consultant } = req;
        consultant.photo = req.files.photo.path;

        const createdConsultant = consultantsService.createConsultant({consultant})
            .then(row => {
                res.send(consultant)
            } )
            .catch(err => next(err));

    })

    router.put( "/:consultantId"   , validationHandler({consultantId:consultantIdSchema}, 'params')
                                        , validationHandler(updateConsultantSchema)
                                        , async function(req, res, next){
        const { consultantId } = req.params;
        const { body: consultant } = req;
        if(consultant.photo !== undefined){
            consultant.photo = req.files.photo.path;
        }

        const updatedConsultant = consultantsService.updateConsultant(consultantId, { consultant })
            .then(row => res.status(202).json({
                message: "Consultant updated successfully",
                data: row
            }) )
            .catch(err => next(err));

    })

    router.delete("/:consultantId", validationHandler({consultantId: consultantIdSchema}, 'params'),async function(req,res,next){
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
