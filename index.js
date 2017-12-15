'use strict'//para poder meter nuevos standares de javascript.

var mongoose = require('mongoose');//cargamos el modulo
var app = require('./app');//carga la App de Express configurada
var port = process.env.port || 3977;//pto para el servidor WEB de nodejs

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean2',{ useMongoClient: true },(err,res)=>{

    if(err){
        throw err;
    }else
    {
        console.log('Conexion Correcta a la BD.');
        app.listen(port,function(){
            console.log('Api Rest de Musica escuchando en http://localhost:' + port);
        })
    }
});//conexion a la base de datos
