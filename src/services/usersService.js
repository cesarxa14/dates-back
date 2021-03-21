const{ connectDB } = require('../db/index-bd');

class UsersService {
    constructor() {
        this.table = 'usuario';
    }

    login(correo, contraseña) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'SELECT public.__dates_1_login($1, $2) res'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql,[correo, contraseña]);
            console.log('sql->>>', sql);
            global.dbp.one(sql).then(data=>{
                return resolve(data.res);
            }).catch(err => {
                err.detalle = new Error().stack;
                console.log(err)
                return reject(err);
            });
        })
    }

    register(obj) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'SELECT public.__dates_2_register($1, $2, $3, $4, $5, $6, $7) res';
            sql = await global.pgp.as.format(sql,[obj.nombres, obj.apellido_pa, obj.apellido_ma, obj.fecha_naci, obj.tipo_usuario, obj.correo, obj.password]);
            console.log('sql->>>', sql);
            global.dbp.one(sql).then(data=>{
                return resolve(data.res);
            }).catch(err => {
                err.detalle = new Error().stack;
                console.log(err)
                return reject(err);
            });
        })
    }



    

    confirmarEmail(id_persona) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'UPDATE persona SET flag_verificado = TRUE WHERE id_persona = $1;'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql,[id_persona]);
            console.log('sql->>>', sql);
            global.dbp.any(sql).then(data=>{
                return resolve(data);
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

