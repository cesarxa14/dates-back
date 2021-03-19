const express = require("express");
const upload = require("../config/multer.config");
const { ConsultantsService } = require("../services/consultantsService");
const _encryptor = require('simple-encryptor')('secret_server_key');

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

    router.post( "/crearConsulta" , upload.single('fotoConsulta'), async function(req, res, next){
        console.log(req.body)
        // console.log('va aqui', req.file)
        let metadata = JSON.parse(req.body.metadata);
        let id_usuario = _encryptor.decrypt(metadata.id_persona);
        let tituloConsulta = req.body.tituloConsulta;
        let descripcionConsulta = req.body.descripcionConsulta;
        let especialidad = parseInt(req.body.especialidad);
        let precio = parseFloat(req.body.precioConsulta);
        let fotoConsulta = req.file.filename;

        let obj = {
            id_usuario,
            tituloConsulta,
            descripcionConsulta,
            especialidad,
            precio,
            fotoConsulta
        };

        console.log(obj);
        const consultants = consultantsService.createConsultant(obj)
            .then(rows =>{

                res.json(rows) 
            } )
            .catch(err => next(err));

    })

    router.get('/getConsultasByAsesor', async function (req,res){
        try{
            console.log(req.query)
            let id_persona = req.query.id_persona;
            id_persona = _encryptor.decrypt(id_persona.replace(/ /g, '+'));
            console.log(id_persona);

            const consultants = await consultantsService.getConsultasByAsesor(id_persona);
        } catch(err){

        }
      
    })

    // router.get( "/:consultantId" ,validationHandler({consultantId: consultantIdSchema},'params'),
    //                                     async function(req, res, next){
    //     const { consultantId } = req.params;

    //     const consultant = consultantsService.getConsultantById(consultantId)
    //         .then(row => {
    //             res.status(200).json({
    //                 message: "Consultant gets successfully",
    //                 data: row,
    //             })
    //         })
    //         .catch(err => next(err));

    // })

    

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
