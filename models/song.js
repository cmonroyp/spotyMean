'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: {type: Schema.ObjectId, ref: 'Album'}//guarda el Id de otro objeto que se tienen en la BD.
})

module.exports = mongoose.model('Song', SongSchema);
