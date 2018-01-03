'use strict'

var bcrypt = require('bcrypt-nodejs');//encrita la contraseña en la bd.
var User = require('../models/user');//importamos el modelo usuario 
var jwt = require('../services/jwt');

const fs = require('fs');//Manipular archivos.
var path = require('path');//acceder a rutas concretas.

function pruebas (req,res){
    res.status(200).send({
        message:'Probando una accion del controlador de usuarios Api Rest'
    });
}

function saveUser(req,res){

    var user = new User();
    var params = req.body;//parametros que llegan de la aplicacion
    console.log(params);
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = params.role;
    user.image = params.image;

    if(params.password){
        //encrypta y guarda
        bcrypt.hash(params.password,null,null,function(err,hash){
            user.password = hash;
            if(user.name != null && user.surname != null && user.email !=null){
                //Guarda el usuario
                user.save((err,userStored)=>{

                    if(err){
                        res.status(500).send({message:'Error Guardando el Usuario'});
                    }
                    else{
                        if(!userStored){
                            res.status(404).send({message:'No se ha registrado el usuario.'});
                        }
                        else{
                            res.status(200).send({user:userStored});
                        }
                    }
                })
            }
            else{
                res.status(200).send({message:'Introduce todos los datos en el Formulario'});
            }
        })

    }else{
        res.status(200).send({message:'Introduce la Contraseña'});
    }
}

function loginUser(req,res){

    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({message:'El usuario no existe.'});
            }else{
                //comprobar la contraseña
                bcrypt.compare(password,user.password,(err,check)=>{
                    if(check){
                        //devuelve datos del usuario logueado
                        if(params.gethash){
                            //devolver token jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })

                        }else{
                            res.status(200).send({user});
                        }
                    }
                    else{
                        res.status(404).send({message:'El usuario no se ha podido loguear.'})
                    }
                })
            }
        }
    })
}

function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub){
        //Se compara el id del usuario con el que existe en el Token.
      return  res.status(500).send({message:'No Autorizado para Actualizar datos.'});
    }
    
    User.findByIdAndUpdate(userId,update,(err,userUpdated)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar el Usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message:'No se ha podido actualizar el Usuario'});
            }else{
                res.status(200).send({user: userUpdated});
                //si queremos mostrar son los datos actualizados
                //res.status(200).send({user: update});
            }
        }
    })
}

function uploadImage(req,res){

    var userId = req.params.id;
    var file_name = 'imagen no Subida!..';

    if(req.files){

        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        //obtener la extension de la imagen 
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        console.log(file_name);

        if(file_ext == 'jpg' || file_ext == 'png' || file_ext == 'gif'){

            User.findByIdAndUpdate(userId,{image:file_name},(err,userUpdated)=>{
                if(!userUpdated){
                    res.status(404).send({message:'No se ha podido actualizar la imagen del Usuario'});
                }else{
                    res.status(200).send(
                        {
                            image: file_name,
                            user: userUpdated
                        });
                }
            });
        }
        else{
            res.status(200).send({message:'Extension del archivo no valida!.'});
            //borramos el archivo en caso que no corresponda a la extension.

            fs.unlinkSync(file_path);
            console.log('successfully deleted',file_path);

            // fs.unlink(file_path, (err) => {
            //     if (err) throw err;
            //     console.log('successfully deleted' , file_path);
            //   });
        }
    }
    else{
        res.status(200).send({message:'No has subido ninguna imagen!..'});
    }
}

function getImageFile(req,res){

    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;

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
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}//se exportan para usarse en todo el proyecto.