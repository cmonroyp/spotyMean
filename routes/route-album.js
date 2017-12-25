'use stric'

var express = require('express');
var AlbumController = require('../controllers/album-controller');
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');//permite la carga de archivos
var md_upload = multipart({uploadDir:'./uploads/album'})

var api = express.Router();

//rutas 
api.get('/album',md_auth.ensureAuth,AlbumController.getAlbum);
api.post('/save-album',md_auth.ensureAuth,AlbumController.saveAlbum);

module.exports = api;