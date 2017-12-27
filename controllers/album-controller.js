'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req,res){

    var albumId = req.params.id;

    Album.findById(albumId).populate({path:'artist'})//populate permite mostrar los datos asociados al id del artista.
        .exec((err,album)=>{

            if(err){
                res.status(500).send({message:'error con el Servidor!.'});
            }
            else{
                if(!album){
                    res.status(404).send({message:'No existe el album creado!.'});
                }
                else{
                    res.status(200).send({album});
                }
            }
        })
}

function getAlbums(req,res){

    var artistId = req.params.artist;

    if(!artistId){
        //muestra todo los albums de la BD.
        var find = Album.find().sort('title');
    }
    else{
        var find = Album.find({artist:artistId}).sort('year');
    }
    find.populate({path:'artist'}).exec((err,albums)=>{
        if(err){
            res.status(500).send({message:'error con el Servidor!.'});
        }
        else{
            if(!albums){
                res.status(404).send({message:'No existen albunes creados!.'});
            }
            else{
                res.status(200).send({albums});
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

function albumUpdate(req,res){

    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId,update,(err,albumUpdated)=>{
        if(err){
            res.status(500).send({message:'Error guardando el album en el servidor!.'});
        }
        else{
            if(!albumUpdated){
                res.status(404).send({message:'No existe el album a actualizar!.'});
            }
            else{
                res.status(200).send({album: albumUpdated});
            }
        }
    })
}

function deleteAlbum(req,res){

    var albumId = req.params.id;
     //removemos los albunes asociados al artista.    
     Album.findByIdAndRemove(albumId,(err,albumRemoved)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion del Servidor!.'});
        }
        else{
            if(!albumRemoved){
                res.status(404).send({message:'Album no encontrado y no Eliminado!.'});
            }
            else{
                //removemos las canciones asociadas al album.
                Song.find({album:albumRemoved._id}).remove((err,songRemoved)=>{
                    if(err){
                        res.status(500).send({message:'Error eliminando la cancion asociado al album!.'});
                    }
                    else{
                        if(!songRemoved){
                            res.status(404).send({message:'cancion no encontrado y no Eliminada!.'});
                        }
                        else{
                            res.status(200).send({album:albumRemoved});
                        }
                    }
                })
            }
        }
    })
}

function uploadImagesAlbum(req,res){

    var albumId = req.params.id;
    var file_name = 'Imagen no Subida..';

    if(req.files){
        //separamos el nombre de la imagen 
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        //extraemos la extension de la imagen
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        console.log(file_name);

        if(file_ext == 'jpg' || file_ext == 'png' || file_ext == 'gif'){

            Album.findByIdAndUpdate(albumId,{image:file_name},(err,albumUpdated)=>{
                if(err){
                    res.status(500).send({message:'Error en la peticion del servidor!.'})
                }
                else{
                    if(!albumUpdated){
                        res.status(404).send({message:'imagen no actualizada del album!.'})
                    }
                    else{
                        res.status(200).send({album: albumUpdated});
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
        res.status(200).send({message:'No has subido ninguna imagen!..'});
    }
}

function getImageFile(req,res){

    var imageFile = req.params.imageFile;
    var path_file = './uploads/album/' + imageFile;

    fs.exists(path_file,function(exist){

        if(exist){

            res.sendFile(path.resolve(path_file));
        }
        else{
            res.status(404).send({message:'La imagen no Existe!..'});
        }
    })
}

module.exports ={
    getAlbum,
    saveAlbum,
    getAlbums,
    albumUpdate,
    deleteAlbum,
    uploadImagesAlbum,
    getImageFile
}