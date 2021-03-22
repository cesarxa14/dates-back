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
        const consultants = await this.consultantsService.getConsultants()
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

    getConsultantsByIdAdviser = async (req, res, next) => {

        // console.log('consultanst',req.query)
        let id_persona = req.query.id_persona;
        id_persona = _encryptor.decrypt(id_persona);
        // console.log(id_persona)

        const consults = await this.consultantsService.getConsultantsByIdAdviser(id_persona)
            .then(data => {
                data.map(row=>{
                    row._id_persona = _encryptor.encrypt(row._id_persona);
                    row.id_consulta = _encryptor.encrypt(row.id_consulta);
                })
                console.log(data)
                res.status(200).send(data);
            }).catch(err => next(err))
    }

    createConsults02 = async (req,res,next) =>{
            try{
                console.log(req.body)
                // console.log('va aqui', req.file)
                let metadata = JSON.parse(req.body.metadata);
                let idPerson = _encryptor.decrypt(metadata.id_persona);
                let title = req.body.tituloConsulta;
                let description = req.body.descripcionConsulta;
                let specialityId = parseInt(req.body.especialidad);
                let price = parseFloat(req.body.precioConsulta);
                // let fotoConsulta = req.file.filename;
                let fotoConsulta = req.body.fotoConsulta.path;
                fotoConsulta = fotoConsulta.split('\\')[2];

                let obj = {
                    idPerson,
                    title,
                    description,
                    specialityId,
                    price,
                    fotoConsulta
                };

                console.log(obj);
                const consultants = this.consultantsService.createConsultant02(obj)
                    .then(rows =>{
                        console.log('consultants', rows);
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
