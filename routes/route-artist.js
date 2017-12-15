'use stric'

var express = require('express');
var ArtistController = require('../controllers/artist-controller');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();


//rutas 
api.get('/artist',md_auth.ensureAuth,ArtistController.getArtist);
api.get('/artistId/:id',md_auth.ensureAuth,ArtistController.getArtistId);
api.post('/save-artist',md_auth.ensureAuth,ArtistController.saveArtist);
api.get('/artists/:page?',md_auth.ensureAuth,ArtistController.getArtists);
api.put('/update-artist/:id',md_auth.ensureAuth,ArtistController.updateArtist);

module.exports = api;