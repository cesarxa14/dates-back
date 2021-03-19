const jwt = require('jsonwebtoken');

//funcion que autentica el token que se genera
function ensureToken(req,res, next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !=='undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'my_secret_key', function(err, data){
            if(err){
                res.sendStatus(403);
            } else {
                next();
            }
        })
        
    } else{
        res.sendStatus(403);
    }
}

module.exports = {
    ensureToken
}