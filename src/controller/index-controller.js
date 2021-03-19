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
async function verificarTokenEmail(req,res){
    try{

        let token = req.params.token;
        console.log(token)
        jwt.verify(token,'my_secret_key', (err, data)=>{
            if(err){
                console.log('Error al obtener el token');
            }else{
                console.log('usuario',data);
                let confirm = modelUsers.confirmarEmail(data.id_persona);
                if(data.id_rol ===1){
                    res.redirect('http://localhost:4200/home-cliente');
                }else if(data.id_rol === 2){
                    res.redirect('http://localhost:4200/home-asesor');
                }

            }
        })


        res.send({email:'confirmed'})
    }catch(err){

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
            let objEmail = {
                nombres: nombres,
                apellido_pa: apellido_pa,
                correoDestino: correo,
                token: token
            }
            let email = await verificacionEmail(objEmail);
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

async function verificacionEmail(obj){
    try{

        console.log('43');
        let cuerpoEmail = `
        <div style="width:100%;height:320px; background-color:EAECF6;text-align:center;border-radius:30px">
            <div style="background-color:0D1649;border-radius:30px">
                <h1 style="text-align:center; color:white">GRACIAS ${obj.nombres} ${obj.apellido_pa}!</h1>
                <h3 style="text-align:center; color:white">Ya casi formas parte de nosotros</h3>
            </div>
        
            <div style="width:80%;height:100;margin-left:10%; background-color:C3C6D7;text-align:center; border-radius: 20px">
                <h2>Verifica tu correo electrónico</h2>
                <button style="padding: 10px; font-weight: 600; font-size: 20px; color: #ffffff;background-color: #1883ba; border-radius: 6px;border: 1px solid #000000;">
                    <a style="text-decoration:none;color:white" target="_blank" href="http://localhost:3000/verifyEmail/${obj.token}">
                    Confirmar cuenta
                    </a>
                </button>
            </div>
            <h5 style="padding:10px 40px 20px 30px">
                Verifique su dirección de correo electrónico para acceder a su cuenta y comenzas a usar Dates!</h5>
            <h5 style="float:right">Dates 2021</h5>
      </div>
      `
        let info = await transporter.sendMail({
            from: 'Dates Asesorias <asesorias.app2021@gmail.com>',
            to: obj.correoDestino,
            subject: 'Verificación de cuenta',
            text: 'Aca iria el link de confirmacion',
            html: cuerpoEmail
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
const { uuid } = require('uuidv4')
async function getEspecialidad(req,res){
    try{
        const especialidad = await modelUsers.getEspecialidad();
        let rand= uuid();
        console.log('numero random',rand);
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
    verificarTokenEmail,
    getEspecialidad
}
