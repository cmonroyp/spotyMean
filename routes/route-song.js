'use strict'

var express = require('express');
var SongController = require('../controllers/song-controller');
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');//permite la carga de archivos
var md_upload = multipart({uploadDir:'./uploads/songs'})

var api = express.Router();

//rutas 
api.get('/song/:id',md_auth.ensureAuth,SongController.getSong);
api.post('/save-song',md_auth.ensureAuth,SongController.saveSong);
api.get('/songs/:album?',md_auth.ensureAuth,SongController.getSongs);
api.put('/update-song/:id',md_auth.ensureAuth,SongController.updateSong);

module.exports = api;
