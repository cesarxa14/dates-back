class GeneralService{
    constructor(){}

    getEspecialidad() {
        return new Promise(async (resolve, reject)=>{
            let sql = 'SELECT * FROM especialidad'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql);
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

    switchedAsesorStatus(id_user, flag_online) {
        return new Promise(async (resolve, reject)=>{
            let sql = 'UPDATE asesor SET flag_online = $2 where _id_persona = $1;'; //crear funcion de crear noticia en pgadmin
            sql = await global.pgp.as.format(sql,[id_user,flag_online]);
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

module.exports = {
    GeneralService
}