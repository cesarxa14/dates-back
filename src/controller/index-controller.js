// const model = require('../schemas/index-modelo');
const jwt = require('jsonwebtoken');
const _encryptor = require('simple-encryptor')('secret_server_key');
const {UsersService} = require('../services/usersService');
const modelUsers = new UsersService();

async function login(req,res){
    try{
<<<<<<< HEAD
        
        // return res.send({msj:'Ingresaste'});
        console.log('fdsfds',req.body)
        let correo = req.body.correo;
=======
        // return res.send({msj:'Ingresaste'});
        console.log(req.body)
        let usuario = req.body.usuario;
>>>>>>> d71dcb5609697bbfed0782d7ca35d744cf8ce387
        let password = req.body.password;
        //se valida que exista el usuario y contraseña sino emite un mensaje con estado de error
        if(!correo) throw { msj: 'Usuario inválido', status: 400};
        if(!password) throw { msj: 'Contraseña inválida', status: 400};
<<<<<<< HEAD
        let login = await modelUsers.login(correo, password);
        console.log('controler', login)
        
        //status = 1 es error y retornara un mensaje de error enviado desde la bd
=======
        let login = await model.login(usuario, password);
        console.log('controler',login)
        return res.send(login)
        //status = 1 es error y retornara un mensaje de error enviado desde la bd 
>>>>>>> d71dcb5609697bbfed0782d7ca35d744cf8ce387
        if(login.status == 1){
            let obj = {
                status: login.status,
                msj   : login.msj
            }
            console.log('24');
            return res.send(obj);
        } else{ // si el status no es 1 entonces la funcion se ejecuto correctamente y ahora si se puede generar un token
            console.log('30');
            const token = jwt.sign(login.metadata, 'my_secret_key', {expiresIn: 60 * 60 * 24 });
            // console.log(token)
            let obj = {
                token: token,
                status: login.status,
                metadata: login.metadata
            }
            console.log(obj)
            return res.status(200).send(obj);
        }


    } catch(err){
        console.log(err);
    }
}

async function register(req,res){
    try{
        let nombres = req.body.nombres;
        let apellido_pa = req.body.apellido_pa;
        let apellido_ma = req.body.apellido_ma;
        let fecha_naci = req.body.fecha_naci;
        let tipo_usuario = req.body.tipo_usuario;
        let correo = req.body.correo;
        let password = req.body.password;
        
        if(!nombres) throw { msj: 'Usuario inválido', status: 400};
        if(!apellido_pa) throw { msj: 'Usuario inválido', status: 400};
        if(!apellido_ma) throw { msj: 'Usuario inválido', status: 400};
        if(!fecha_naci) throw { msj: 'Usuario inválido', status: 400};
        if(!tipo_usuario) throw { msj: 'Usuario inválido', status: 400};
        if(!correo) throw { msj: 'Usuario inválido', status: 400};
        if(!password) throw { msj: 'Usuario inválido', status: 400};

        tipo_usuario = _encryptor.decrypt(tipo_usuario.replace(/ /g, '+'));


        let obj = {
            nombres,
            apellido_pa,
            apellido_ma,
            fecha_naci,
            tipo_usuario,
            correo,
            password
        };
        let register = await modelUsers.register(obj);

        if(register.status == 1){
            let obj = {
                status: register.status,
                msj   : register.msj
            }
            console.log('24');
            return res.send(obj);
        } else{ // si el status no es 1 entonces la funcion se ejecuto correctamente y ahora si se puede generar un token
            console.log('30');
            const token = jwt.sign(register.metadata, 'my_secret_key', {expiresIn: 60 * 60 * 24 });
            // console.log(token)
            let obj = {
                token: token,
                status: register.status,
                metadata: register.metadata,
                msj: register.msj
            }
            
            return res.status(200).send(obj);
        }
       
    }catch(err){

    }
}

async function getEspecialidad(req,res){
    try{
        const especialidad = await modelUsers.getEspecialidad();
        especialidad.map(row=>{
            return row.id_especialidad = _encryptor.encrypt(row.id_especialidad);
        })
        res.send(especialidad)
    }catch(err){

    }
}



module.exports = {
    login,
    register,
    getEspecialidad
}
