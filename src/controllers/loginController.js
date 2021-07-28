/*
    Controllers: login
*/
const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
const { validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const usuarios = path.join( __dirname, './../database/model/usuarios.json' );
const usuariosJson = JSON.parse( fs.readFileSync(usuarios),'utf-8' );

let  obtenerLogin = ( req, res = response)=>{
    //res.render( path.resolve(__dirname, '../views/users/login') );
    res.render('users/login');
}

let procesarLogin = (req, res = response)=>{
    let usuarioLogueado;
    let errors = validationResult( req );
    if( errors.isEmpty() ){
        let listaUsuarios = usuariosJson;

        for( let i=0; i<listaUsuarios.length; i++){
            if( listaUsuarios[i].correo == req.body.correo ){
                if( bcrypt.compareSync( req.body.contrasenia,  listaUsuarios[i].contrasenia ) ){
                    usuarioLogueado = listaUsuarios[i];
                    break;
                }
            }
        }

        if( usuarioLogueado == undefined ){
            return res.render( 'users/login', { errors: [{msg: 'Credenciales inválidas'}] } );
        }

        req.session.usuarioLogueado = usuarioLogueado;
        let newUsuario = req.session.usuarioLogueado;
        res.render('users/perfilUsuario', { newUsuario, ok: true });
    }else{
        return res.render( 'users/login', { errors: errors.array() } );
    }
}

module.exports = { obtenerLogin, procesarLogin }