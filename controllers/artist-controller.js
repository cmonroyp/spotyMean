'use strict'

var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req,res){

    res.status(200).send({message:'controlador artista!.'});
}

function getArtistId(req,res){

    var userId = req.params.id;
    //var findUser = req.body;

    Artist.findById(userId,(err,findUser)=>{
        
        if(err){
            res.status(500).send({message:'Usuario no encontrado!.'});
        }
        else
        {
            res.status(200).send({artistId:findUser});
        }
    })
}

function saveArtist(req,res){

    var artist = new Artist();
    var params = req.body;

    artist.name = params.name;
    artist.description = params.description;
    artist.image = params.image;

    artist.save((err,artistStored)=>{

        if(err){
            res.status(500).send({message:'Error al guardar el artista!.'});
        }
        else{
            if(!artistStored){
                res.status(404).send({message:'El artista no ha sido guradado!.'});
            }
            else{
                res.status(200).send({artist: artistStored});
            }
        }
    })
}

module.exports ={
    getArtist,
    getArtistId,
    saveArtist,
}