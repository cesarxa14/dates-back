const express = require('express');
const app = express();
const db = require('./src/bd/index-bd');
const path = require('path');
const cors = require('cors');

//primero nos conectamos a la base de datos
db.connectDB();
app.use(cors());

//declaramos 'port' como variable con valor 3000 por defecto
app.set('port', process.env.PORT || 3000);
app.use(express.json());
//usamos el archivo index-rutas.js donde estaran todas las rutas
app.use(require('./src/rutas/index-rutas'));

//levantamos el servidor
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})
