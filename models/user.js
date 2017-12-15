'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;//esquema de la base de datos

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

module.exports = mongoose.model('User',UserSchema);