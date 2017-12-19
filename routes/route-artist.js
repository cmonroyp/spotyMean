'use stric'

var express = require('express');
var ArtistController = require('../controllers/artist-controller');
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');//permite la carga de archivos
var md_upload = multipart({uploadDir:'./uploads/artist'})

var api = express.Router();


//rutas 
api.get('/artist',md_auth.ensureAuth,ArtistController.getArtist);
api.get('/artistId/:id',md_auth.ensureAuth,ArtistController.getArtistId);
api.post('/save-artist',md_auth.ensureAuth,ArtistController.saveArtist);
api.get('/artists/:page?',md_auth.ensureAuth,ArtistController.getArtists);
api.put('/update-artist/:id',md_auth.ensureAuth,ArtistController.updateArtist);
api.delete('/delete-artist/:id',md_auth.ensureAuth,ArtistController.deleteArtist);
api.post('/upload-image-artist/:id',[md_auth.ensureAuth,md_upload],ArtistController.uploadImagesArtist);
api.get('/get-image-artist/:imageFile',ArtistController.getImageFile);

module.exports = api;