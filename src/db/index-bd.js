const { config } = require('../config');
function connectDB(){
    return new Promise(async (resolve, reject)=>{
        global.pgp = require('pg-promise')({noWarnings: false});
        const params = {
            user: config.dbUser,
            pass: config.dbPassword,
            host: config.dbHost,
            port: config.dbPort,
            bd: config.dbName
        };

        const __conexion = `postgres://${params.user}:${params.pass}@${params.host}:${params.port}/${params.bd}`;
        global.dbp = global.pgp(__conexion);
        global.dbp.connect();
        console.log('Conectado a la base de datos');
        return resolve(true)
    })
}

module.exports ={
    connectDB
}
