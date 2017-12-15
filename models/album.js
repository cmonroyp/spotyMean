'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {type: Schema.ObjectId, ref: 'Artist'}//guarda el Id de otro objeto que se tienen en la BD.
})

module.exports = mongoose.model('Album', AlbumSchema);