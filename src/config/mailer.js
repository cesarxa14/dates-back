const nodemailer = require('nodemailer');
const { google } = require ('googleapis')
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com.',
//     port: 465,
//     secure: true,
//     auth: {
//         user: 'cetolara06@gmail.com',
//         pass: 'xrqcciorabboyzhb'
//     }
// });

// transporter.verify().then(()=>{
//     console.log('Listo para enviar emails');
// })


const CLIENTE_ID = '1007021651567-n019e13aoh641ishmikjakko6pglcqfu.apps.googleusercontent.com';
const CLIENTE_SECRET = 'w6Q__Cs0NSxp6odef51doeTA';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//043sBQTUW9nbNCgYIARAAGAQSNwF-L9IroYBpqGmx-IU7D4klYQ0rSchtMf5LjWacjKgk-48VVHaAYrIqJp_-stReXOFIbATWD_k';

const oAuthCliente = new google.auth.OAuth2(CLIENTE_ID, CLIENTE_SECRET, REDIRECT_URI);
oAuthCliente.setCredentials({refresh_token: REFRESH_TOKEN});
const ACCESS_TOKEN = oAuthCliente.getAccessToken();

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com.',
    auth: {
        type: 'OAuth2',
        user: 'asesorias.app2021@gmail.com',
        clientId: CLIENTE_ID,
        clientSecret: CLIENTE_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN
    }
});
module.exports = {transporter}