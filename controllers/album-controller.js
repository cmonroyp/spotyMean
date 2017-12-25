'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req,res){

    res.status(200).send({message:'controlador album!.'});
}

function getAlbums(req,res){

    var page = req.params.page || 1;//en caso que no venga la pagina muestra la primera.
    var itemPerPage = 3;//registros que se mostrara por pagina.

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

function saveAlbum(req,res){

    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = params.image;
    album.artist = params.artist

    //console.log(params)
    album.save((err,albumStored)=>{

        if(err){
            res.status(500).send({message:'Error guardando el album en el servidor!.'});
        }
        else{
            if(!albumStored){
                res.status(404).send({message:'El album no ha sido guradado!.'});
            }
            else{
                res.status(200).send({album: albumStored});
            }
        }
    })
}

module.exports ={
    getAlbum,
    saveAlbum
}