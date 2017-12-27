'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getSong(req,res){

    var songId = req.params.id;

    Song.findById(songId).populate({path:'album'}).exec((err,song)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion con el servidor!.'});
        }
        else{
            if(!song){
                res.status(404).send({message:'Cancion no encontrada!.'});
            }
            else{
                res.status(200).send({song});
            }
        }
    })
}

function getSongs(req,res){

    var albumId = req.params.album;

    if(!albumId){
        var find = Song.find({}).sort('number');
    }
    else{
        var find = Song.find({album:albumId}).sort('number');
    }

    find.populate({
        path:'album',//trae toda la informacion del album
        populate:{//saca la informacion del artista asocida al album
            path:'artist',
            model:'Artist'//pasamos el modelo del artista para mostrar todos sus campos.
        }
    }).exec((err,songs)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion con el servidor!.'});
        }
        else{
            if(!songs){
                res.status(404).send({message:'Canciones no encontradas!.'});
            }
            else{
                res.status(200).send({songs});
            }
        }
    })
}

function saveSong(req,res){

    var song = new Song();
    var params = req.body;

    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = params.file;
    song.album = params.album;

    song.save((err,songStored)=>{

        if(err){
            res.status(500).send({message:'Error en la peticion con el Servidor!.'});
        }
        else{
            if(!songStored){
                res.status(404).send({message:'Cancion no Almacenada!.'});
            }
            else{
                res.status(200).send({song:songStored});
            }
        }
    })
}

function updateSong(req,res){

    var songId = req.params.id;
    var params = req.body;

    Song.findByIdAndUpdate(songId,params,(err,songUpdated)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion con el Servidor!.'});
        }
        else{
            if(!songUpdated){
                res.status(404).send({message:'Cancion no Actualizada!.'});
            }
            else{
                res.status(200).send({song:songUpdated});
            }
        }
    })
}

module.exports ={
    getSong,
    saveSong,
    getSongs,
    updateSong
}