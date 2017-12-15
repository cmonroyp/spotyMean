'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req,res){

    res.status(200).send({message:'controlador artista!.'});
}

function getArtists(req,res){

    // if(req.params.page){
    //     var page = req.params.page;
    // }
    // else{
    //     var page = 1;
    // }
    var page = req.params.page || 1;//en caso que no venga la pagina muestra la primera.
    var itemPerPage = 3;

    Artist.find().sort('name').paginate(page,itemPerPage,function(err,artists,total){

        if(err){
            res.status(500).send({message:'Error en la Peticion!.'});
        }
        else{
            if(total === 0 || !artists){
                res.status(404).send({message:'No hay Artistas!.'});
            }
            else{
               return res.status(200).send({
                    total_items: total,
                    artists: artists
                })
            }
        }
    })
}

function getArtistId(req,res){

    var userId = req.params.id;
    //var findUser = req.body;

    Artist.findById(userId,(err,findArtist)=>{
        
        if(err){
            res.status(500).send({message:'Usuario no encontrado!.'});
        }
        else
        {
            res.status(200).send({artistId:findArtist});
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

function updateArtist(req,res){

    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId,update,(err,updateArtist)=>{

        if(err){
            res.status(500).send({message:'Error en la Actualizacion del Artista!.'});
        }
        else{

            if(!updateArtist){
                res.status(404).send({message:'Artista no Encontrado y no Actualizado!.'});
            }
            else{
                res.status(200).send({artistUpdate:updateArtist});
            }
        }
    })
}

module.exports ={
    getArtist,
    getArtistId,
    saveArtist,
    getArtists,
    updateArtist
}