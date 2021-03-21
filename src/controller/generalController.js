const {GeneralService} = require('../services/generalService');
const generalService = new GeneralService();
const _encryptor = require('simple-encryptor')('secret_server_key');

class GeneralController{
    constructor(){}

    getEspecialidad = async(req, res) => {
        try{
            const especialidad = await generalService.getEspecialidad();
            console.log('especialidad', especialidad)
            especialidad.map(row=>{
                return row.id_especialidad = _encryptor.encrypt(row.id_especialidad);
            })
            res.send(especialidad)
        }catch(err){
    
        }
    }
}

module.exports = {GeneralController}