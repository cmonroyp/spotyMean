'use strict'

var express = require('express');
var UserController = require('../controllers/user');//cargamos el controlador de usuario
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');//permite la carga de archivos
var md_upload = multipart({uploadDir:'./uploads/users'})

var api = express.Router();

api.get('/pruebas-controlador',UserController.pruebas);
api.post('/register',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);

module.exports = api;