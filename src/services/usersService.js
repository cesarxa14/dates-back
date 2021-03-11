const{ connectDB } = require('../db/index-bd');

class UsersService {
    constructor() {
        this.table = 'usuario';
    }

    login(usuario, contraseña) {
        console.log('fdfds')
        return new Promise(async (resolve, reject)=>{
            let sql = 'SELECT public.__dates_1_login($1, $2) res'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql,[usuario, contraseña]);
            console.log('sql->>>', sql);
            global.dbp.one(sql).then(data=>{
                console.log('fdsfd', data);
                return resolve(data.res);
            }).catch(err => {
                err.detalle = new Error().stack;
                console.log(err)
                return reject(err);
            });
        })
    }
}

// export {UsersService}
module.exports = {
    UsersService
}

