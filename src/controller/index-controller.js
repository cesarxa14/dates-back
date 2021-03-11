// const model = require('../schemas/index-modelo');
const {UsersService} = require('../services/usersService');
const modelUsers = new UsersService();

async function login(req,res){
    try{

        // return res.send({msj:'Ingresaste'});
        console.log('fdsfds',req.body)
        let usuario = req.body.usuario;
        let password = req.body.password;
        //se valida que exista el usuario y contraseña sino emite un mensaje con estado de error
        if(!usuario) throw { msj: 'Usuario inválido', status: 400};
        if(!password) throw { msj: 'Contraseña inválida', status: 400};
        let login = await modelUsers.login(usuario, password);
        // console.log('controler')
        return res.send(login)

        //status = 1 es error y retornara un mensaje de error enviado desde la bd
        if(login.status == 1){
            let obj = {
                status: login.status,
                msj   : login.msj
            }
            return res.send(obj);
        } else{ // si el status no es 1 entonces la funcion se ejecuto correctamente y ahora si se puede generar un token
            let login = {
                usuario: usuario,
                password: password
            }
            const token = jwt.sign(login, 'my_secret_key', {expiresIn: 60 * 60 * 24 });
            console.log(token)
            let obj = {
                token: token,
                status: login.status,
                metadata: login.metadata
            }
            return res.status(200).send(obj);
        }


    } catch(err){

    }
}

async function register(req,res){
    try{
        console.log(req.body)
    }catch(err){

    }
}

module.exports = {
    login,
    register
}
