const express = require('express');
const app = express();
// const db = require()
const path = require('path');
const cors = require('cors');

app.use(cors());

app.set('port', process.env.PORT || 3000);
app.use(express.json());
// app.use(require('rutas'));

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})