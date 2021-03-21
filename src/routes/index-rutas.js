const {Router} = require('express');
const router = Router();
const Auth = require('../auth/index-auth')
const controller = require('../controller/index-controller');
const {apiConsultants} = require('./consultants.routes');
const {apiAuth} = require('./auth.routes')
const {apiGeneral} = require('./general.routes')
const {
    consultantIdSchema,
    createConsultantSchema,
    updateConsultantSchema
} = require("../utils/schemas/consultant");




function indexRoutes(app) {
    
    apiConsultants(app);
    apiAuth(app);
    apiGeneral(app);
}

module.exports = {
    indexRoutes
};
