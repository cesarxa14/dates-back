const express = require('express');
const db = require('./src/db/index-bd');
const cors = require('cors');
const formData = require("express-form-data");
const os = require("os");
const { logErrors, wrapError, errorHandler } = require('./src/utils/middleware/errorHandlers');
const { notFoundHandler } = require('./src/utils/middleware/notFoundHandler');
const { indexRoutes } = require('./src/routes/index-rutas')
const options = {
    uploadDir: './public/uploads',
    //autoClean: true
};

//Instanciamos app con express
const app = express();

//primero nos conectamos a la base de datos
db.connectDB();
app.use(cors());

//declaramos 'port' como variable con valor 3000 por defecto
app.set('port', process.env.PORT || 3000);
//Agregamos handler para recibir json
app.use(express.json());


// parse data with connect-multiparty.
// app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
//app.use(formData.format());
// change the file objects to fs.ReadStream
//app.use(formData.stream());
// union the body and the files
// app.use(formData.union());

//usamos el archivo index-routes.js donde estaran todas las routes
//app.use(require('./src/routes/index-rutas')); //Lo comente para que no me de errores
// api(app);
indexRoutes(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

//levantamos el servidor
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})
