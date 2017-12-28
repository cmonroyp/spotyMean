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

function deleteSong(req,res){

    var songId = req.params.id;

    Song.findByIdAndRemove(songId,(err,songRemoved)=>{

    if(err){
            res.status(500).send({message:'Error en la peticion con el Servidor!.'});
        }
        else{
            if(!songRemoved){
                res.status(404).send({message:'Cancion no Eliminada!.'});
            }
            else{
                res.status(200).send({song:songRemoved});
            }
        }
    })
}

function uploadFileSong(req,res){

    var songId = req.params.id;
    var file_name = 'archivo no Subido..';

    if(req.files){
        //separamos el nombre de la imagen 
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        //extraemos la extension de la imagen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        console.log(file_name);

        if(file_ext == 'mp3' || file_ext == 'ogg'){

            Song.findByIdAndUpdate(songId,{file:file_name},(err,songUpdated)=>{
                if(err){
                    res.status(500).send({message:'Error en la peticion del servidor!.'})
                }
                else{
                    if(!songUpdated){
                        res.status(404).send({message:'archivo no actualizado de la cancion!.'})
                    }
                    else{
                        res.status(200).send({song: songUpdated});
                    }
                }
            })
        }
        else{
            res.status(200).send({message:'Extension del archivo no valida!.'});

            //borramos el archivo en caso que no corresponda a la extension.
            fs.unlinkSync(file_path);
            console.log('successfully deleted',file_path);
        }
    }
    else{
        res.status(200).send({message:'No has subido ningun archivo!..'});
    }
}

function getFileSong(req,res){

    var songFile = req.params.songFile;
    var path_file = './uploads/songs/' + songFile;

    fs.exists(path_file,function(exist){

        if(exist){

            res.sendFile(path.resolve(path_file));
        }
        else{
            res.status(404).send({message:'El archivo no Existe!..'});
        }
    })
}

module.exports ={
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFileSong,
    getFileSong
}