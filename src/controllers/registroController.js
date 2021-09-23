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

const RegistroModel = require('../models/registroModel');

let  nuevoRegistro = ( req, res = response)=>{
    res.render('users/registro');
}

let crearRegistro = ( req, res = response)=>{
    let errors = validationResult( req );

    if( !errors.isEmpty() ){
        return res.render('users/registro', { errors: errors.array(), old: req.body });
    }

    let usuarioExiste = RegistroModel.obtenerPorEmail( 'correo', req.body.correo );
    if( usuarioExiste ){
        return res.render('users/registro', { errors: [ { msg: 'Este email ya está registrado', param: 'correo' } ], old: req.body });
    }

    let usuarioACrear = {
        ...req.body,
        avatar: req.file.filename ,
        contrasenia: bcrypt.hashSync( req.body.contrasenia, 10 )
    }

    RegistroModel.crearUsuario( usuarioACrear );
    return res.render( 'users/login' );
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