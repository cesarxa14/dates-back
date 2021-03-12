// const model = require('../schemas/index-modelo');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const _encryptor = require('simple-encryptor')('secret_server_key');
const {UsersService} = require('../services/usersService');
const modelUsers = new UsersService();
const { transporter} = require('../config/mailer')

async function login(req,res){
    try{
        
        // return res.send({msj:'Ingresaste'});
        console.log('fdsfds',req.body)
        let correo = req.body.correo;
        let password = req.body.password;
        //se valida que exista el usuario y contraseña sino emite un mensaje con estado de error
        if(!correo) throw { msj: 'Usuario inválido', status: 400};
        if(!password) throw { msj: 'Contraseña inválida', status: 400};
        let login = await modelUsers.login(correo, password);
        console.log('controler', login)
        
        //status = 1 es error y retornara un mensaje de error enviado desde la bd
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
            let email = await verificacionEmail(correo);
            console.log(email)
            
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

async function verificacionEmail(correo){
    try{
        
        console.log('43');
        let info = await transporter.sendMail({
            from: 'Dates Asesorias <asesorias.app2021@gmail.com>',
            to: correo,
            subject: 'Verificación de cuenta',
            text: 'Aca iria el link de confirmacion',
            html: `<h1>Aqui iria el link de confirmacion</h1>
                    <h2>Asesorias 2021</h2>`
        }, (error, info)=>{
            if(error){
                // res.status(500).send(error.message);
                throw {msj: 'Error'}
            }else{
                console.log('email enviado', info);
                // res.status(200).json({messageId});
                return info.messageId;
            }
        });

     
    }catch(err){
        console.log(err);
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
    verificacionEmail,
    getEspecialidad
}
