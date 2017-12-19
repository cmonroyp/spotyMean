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
                res.status(404).send({message:'Artista no encontrado y no Actualizado!.'});
            }
            else{
                res.status(200).send({artistUpdate:updateArtist});
            }
        }
    })
}

function deleteArtist(req,res){

    var artistId = req.params.id;
    Artist.findByIdAndRemove(artistId,(err,artistRemoved)=>{

        if(err){
            res.status(500).send({message:'Error eliminando el Artista!.'});
        }
        else{
            if(!artistRemoved){
                res.status(404).send({message:'Artista no encontrado y no Eliminado!.'});
            }
            else{
                //removemos los albunes asociados al artista.
                Artist.find({artist:artistRemoved._id}).remove((err,albumRemoved)=>{
                    if(err){
                        res.status(500).send({message:'Error eliminando el album asociado al artista!.'});
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
                                        res.status(200).send({artist:artistRemoved});
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}

function uploadImagesArtist(req,res){

    var artistId = req.params.id;
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

            Artist.findByIdAndUpdate(artistId,{image:file_name},(err,artistUpdate)=>{
                if(err){
                    res.status(500).send({message:'Error al actualizar la imagen del artista en el Servidor'})
                }
                else{
                    if(!artistUpload){
                        res.status(404).send({message:'imagen no actualizada del artista.'})
                    }
                    else{
                        res.status(200).send({artist: artistUpdate});
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
    var path_file = './uploads/artist/' + imageFile;

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
    getArtist,
    getArtistId,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImagesArtist,
    getImageFile
}