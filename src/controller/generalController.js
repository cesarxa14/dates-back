const {GeneralService} = require('../services/generalService');
const generalService = new GeneralService();
const _encryptor = require('simple-encryptor')('secret_server_key');

class GeneralController{
    constructor(){}

    getEspecialidad = async(req, res) => {
        try{
            const especialidad = await generalService.getEspecialidad();
            console.log('especialidad', especialidad)
            // especialidad.map(row=>{
            //     return row.id_especialidad = _encryptor.encrypt(row.id_especialidad);
            // })
            res.send(especialidad)
        }catch(err){
    
        }
    }

    switchedAsesorStatus = async(req, res) => {
        try{
            console.log(req.body);
            let id_user = req.body.id_user;
            let flag_online = req.body.flag_online;
    
            id_user = _encryptor.decrypt(id_user);
            console.log(id_user)
            const flg_online = await generalService.switchedAsesorStatus(id_user, flag_online);
            
            res.send({message:'toggle cambio'})
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = {GeneralController}