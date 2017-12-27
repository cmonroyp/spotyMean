'use stric'

var express = require('express');
var AlbumController = require('../controllers/album-controller');
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');//permite la carga de archivos
var md_upload = multipart({uploadDir:'./uploads/album'})

var api = express.Router();

//rutas 
api.get('/album/:id',md_auth.ensureAuth,AlbumController.getAlbum);
api.get('/albums/:artist?',md_auth.ensureAuth,AlbumController.getAlbums);
api.put('/update-album/:id',md_auth.ensureAuth,AlbumController.albumUpdate);
api.post('/save-album',md_auth.ensureAuth,AlbumController.saveAlbum);
api.delete('/delete-album/:id',md_auth.ensureAuth,AlbumController.deleteAlbum);
api.post('/upload-image-album/:id',[md_auth.ensureAuth,md_upload],AlbumController.uploadImagesAlbum);
api.get('/get-image-album/:imageFile',AlbumController.getImageFile);

module.exports = api;