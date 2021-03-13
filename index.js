const express = require('express');
const app = express();
const db = require('./src/db/index-bd');
const path = require('path');
const cors = require('cors');
const { consultantController } = require("./src/controller/consultantController");
const { logErrors, wrapError, errorHandler } = require('./src/utils/middleware/errorHandlers');
const { notFoundHandler } = require('./src/utils/middleware/notFoundHandler');

//primero nos conectamos a la base de datos
db.connectDB();
app.use(cors());

//declaramos 'port' como variable con valor 3000 por defecto
app.set('port', process.env.PORT || 3000);
app.use(express.json());


//usamos el archivo index-routes.js donde estaran todas las routes
app.use(require('./src/routes/index-rutas'));
consultantController(app);

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
