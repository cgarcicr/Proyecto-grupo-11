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

let  nuevoRegistro = ( req, res = response)=>{
    res.render('users/registro');
}

let crearRegistro = ( req, res = response)=>{
    let errors = validationResult( req );
    if( errors.isEmpty() ){
        let listaUsuarios = usuariosJson;
        let { nombre, apellido, correo, contrasenia, fechaNacimiento } = req.body;
        let salt = bcrypt.genSaltSync();
        let newUsuario = {
            id: listaUsuarios.length + 1,
            nombre : nombre,
            apellido: apellido,
            correo: correo,
            contrasenia: bcrypt.hashSync( contrasenia, salt),
            fechaNacimiento: fechaNacimiento
        }
        listaUsuarios.push( newUsuario );
        fs.writeFile('./src/database/model/usuarios.json', JSON.stringify( listaUsuarios, null, ' ' ), ( err )=>{
            if( err ){
                console.log( 'El error es: ' + err);
            }else{
                console.log( 'Actualizado' );
            }
        });
        res.render('users/perfilUsuario', { newUsuario });
    }else{
        res.render('users/registro', { errors: errors.array(), old: req.body });
    }

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