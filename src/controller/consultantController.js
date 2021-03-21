const { ConsultantsService } = require("../services/consultantsService");
const _encryptor = require('simple-encryptor')('secret_server_key');

class ConsultantController {
    constructor() {
        this.consultantsService = new ConsultantsService();
        this.getAllConsultants = this.getAllConsultants.bind(this);
        this.getConsultantById = this.getConsultantById.bind(this);
        this.createConsultant = this.createConsultant.bind(this);
        this.updateConsultantById = this.updateConsultantById.bind(this);
        this.deleteConsultantById = this.deleteConsultantById.bind(this);
    }



    getAllConsultants = async (req, res, next) => {
        const consultants = this.consultantsService.getConsultants()
            .then(rows => res.json(rows) )
            .catch(err => next(err));
    }

    getConsultantById = async (req, res, next) => {
        const { consultantId } = req.params;
        const consultant = this.consultantsService.getConsultantById(consultantId)
            .then(row => {
                res.status(200).json({
                    message: "Consultant gets successfully",
                    data: row,
                })
            })
            .catch(err => next(err));
    }

    createConsultant = async (req, res, next) => {
        const { body: consultant } = req;
        consultant.photo = req.files.photo.path;

        const createdConsultant = this.consultantsService.createConsultant({consultant})
            .then(row => {
                res.send(consultant)
            } )
            .catch(err => next(err));
    }

    getConsultasByAsesor = async (req, res) =>{
        try{
            const consults = await this.consultantsService.getConsultasByAsesor();
            consults.map(row=>{
                row._id_persona = _encryptor.encrypt(row._id_persona);
                row.id_consulta = _encryptor.encrypt(row.id_consulta);
            })
            // console.log('holis',consults);
            res.status(200).send(consults);

        } catch(err) {

        }
    }

    crearConsulta = async (req,res,next) =>{
            try{
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
                const consultants = this.consultantsService.createConsultant(obj)
                    .then(rows =>{
                        res.json(rows) 
                    } )
                    .catch(err => next(err));
            } catch(err){

            }
    }

    updateConsultantById = async (req, res, next) => {
        const { consultantId } = req.params;
        const { body: consultant } = req;
        if(consultant.photo !== undefined){
            consultant.photo = req.files.photo.path;
        }

        const updatedConsultant = this.consultantsService.updateConsultant(consultantId, { consultant })
            .then(row => res.status(202).json({
                message: "Consultant updated successfully",
                data: row
            }) )
            .catch(err => next(err));

    }

    deleteConsultantById = async (req,res,next) => {
        const { consultantId } = req.params;

        const deletedConsultant = this.consultantsService.deleteConsultant(consultantId)
            .then(value => res.status(200).json({
                message: "Consultant deleted successfully",
                data: value
            }))
            .catch(err => next(err));
    }
}
module.exports = {
    ConsultantController
}
