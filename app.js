'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/route-artist');
var album_routes = require('./routes/route-album');
var song_routes = require('./routes/route-song');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());//convierte las peticiones http en json.

//Configurar cabeceras http

//rutas base 
app.use('/api',user_routes);
app.use('/api',artist_routes);
app.use('/api',album_routes);
app.use('/api',song_routes);

module.exports = app;