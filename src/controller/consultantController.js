const { ConsultantsService } = require("../services/consultantsService");

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
