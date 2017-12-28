'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/route-artist');
var album_routes = require('./routes/route-album');
var song_routes = require('./routes/route-song');

app.use(bodyParser.urlencoded({limit: "50mb", extended: false, parameterLimit:50000}));
app.use(bodyParser.json({limit: "50mb"}));

//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());//convierte las peticiones http en json.

//Configurar cabeceras http
app.use((req,res,next)=>{

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, DELETE, POST, OPTIONS');
    res.header('Allow','GET, PUT, DELETE, POST, OPTIONS');

    next();
})


//rutas base 
app.use('/api',user_routes);
app.use('/api',artist_routes);
app.use('/api',album_routes);
app.use('/api',song_routes);

module.exports = app;