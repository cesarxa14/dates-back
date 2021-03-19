const joi = require('joi');

const consultantIdSchema = joi.number() //.regex(/`[0-9a-fA-F]{24}`/);
const consultantIdPerson = joi.number() //.regex(/`[0-9a-fA-F]{24}`/);
const consultantTitleSchema = joi.string().max(100);
const consultantDescriptionSchema = joi.string().max(500);
const consultantSpecialityIdSchema = joi.number() //.regex(/`[0-9a-fA-F]{24}`/);
const consultantPhotoSchema = joi.any();
const consultantPriceSchema = joi.number();

const createConsultantSchema = {
    idPerson: consultantIdPerson.required(),
    title: consultantTitleSchema.required(),
    description: consultantDescriptionSchema.required(),
    //La especialidad debemos sacarla del id del usuario creador
    specialityId: consultantSpecialityIdSchema.required(),
    photo: consultantPhotoSchema.required(),
    price: consultantPriceSchema.required()
};

const updateConsultantSchema = {
    idPerson: consultantIdPerson,
    title: consultantTitleSchema,
    description: consultantDescriptionSchema,
    specialityId: consultantSpecialityIdSchema,
    photo: consultantPhotoSchema,
    price: consultantPriceSchema
};
module.exports = {
    consultantIdSchema,
    createConsultantSchema,
    updateConsultantSchema
}
