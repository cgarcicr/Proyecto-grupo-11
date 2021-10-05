/*
    Controllers: registro
*/
const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { validationResult} = require('express-validator');
const usuarios = path.join( __dirname, './../database/model/usuarios.json' );
const usuariosJson = JSON.parse( fs.readFileSync(usuarios),'utf-8' );
let db = require("../../database/models");

const RegistroModel = require('../models/registroModel');

let  nuevoRegistro = ( req, res = response)=>{
    res.render('users/registro');
}

let crearRegistro = ( req, res = response)=>{
    let errors = validationResult( req );

    if( !errors.isEmpty() ){
        return res.render('users/registro', { errors: errors.array(), old: req.body });
    }

    if( req.body.contrasenia != req.body.contrasenia2 ){
        return res.render('users/registro',{ errors: [ { msg: 'Las contraseñas deben ser iguales', param: 'contrasenia' } ], old: req.body })
    }

    db.Cliente.findOne({
        where: {
            email: req.body.email
        }
    }).then( resp =>{
        return resp;
    }).then(resp =>{
        if( resp.dataValues.email == req.body.email ){
            return res.render('users/registro', { errors: [ { msg: 'Este email ya está registrado', param: 'email' } ], old: req.body });
        }
    })
    .catch( resp =>{
            delete req.body.contrasenia2;
            db.Cliente.create({
            nombre : req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contrasenia: bcrypt.hashSync( req.body.contrasenia, 10 ),
            avatar: req.file.filename,
            rol: 2
        })
        .then( ( resp )=>{
            return res.render( 'users/login' );
        });
    })
}

let perfil = ( req, res = response)=>{
    let ok = false;
    let newUsuario = req.session.usuarioLogueado;
    if( newUsuario != undefined){
        ok = true
    }
    res.render( 'users/perfilUsuario', { newUsuario, ok });
}

module.exports = { nuevoRegistro, crearRegistro, perfil }