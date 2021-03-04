function connectDB(){
    return new Promise(async (resolve, reject)=>{
        global.pgp = require('pg-promise')({noWarnings: false});
        const params = {
            user: 'postgres',
            pass: 'upc2021*',
            host: 'dates-test.cvb33c92cmxc.us-east-1.rds.amazonaws.com',
            port: '5432',
            bd: 'dates-test'
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