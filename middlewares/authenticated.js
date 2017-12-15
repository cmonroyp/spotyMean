'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');//valida la fecha de expiracion del Token.
var secret = 'clave_secreta_curso';

exports.ensureAuth = function(req,res,next){

    if(!req.headers.authorization){
        return res.status(403).send({message:'La peticion no tiene la cabecera de autenticacion.'});
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');//recoge el token del usuario y reemplaza si viene con comillas.

    try {
        var payload = jwt.decode(token,secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message:'El Token a Expirado!.'});
        }
    } 
    catch (ex) {
       // console.log(ex);
        return res.status(404).send({message:'Token no Valido!.'});
    }

    req.user = payload;//datos del usuario identificado en el token.
    next();
}