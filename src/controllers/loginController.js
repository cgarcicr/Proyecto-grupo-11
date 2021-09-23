/*
    Controllers: login
*/
const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
const { validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const LoginModel = require('../models/loginModel');
const { send } = require('process');

let  obtenerLogin = ( req, res = response)=>{
    return res.render('users/login');
}

let procesarLogin = (req, res = response)=>{
    let errors = validationResult( req );
    let usuarioLogueado = LoginModel.obtenerUsuarioPorEmail( 'correo', req.body.correo );

    if( usuarioLogueado ){
        let okPassword = bcrypt.compareSync( req.body.contrasenia, usuarioLogueado.contrasenia );
        if( okPassword ){
            delete usuarioLogueado.contrasenia;
            req.session.usuarioLogueado = usuarioLogueado;

            //Creación de cookie
            if( req.body.recordarme ){
                res.cookie('correoUsuario', req.body.correo, { maxAge: (1000 * 60) * 60 })
            }
            // return res.render( 'users/perfilUsuario', { usuario: req.session.usuarioLogueado } );
            return res.redirect('/');
        }
        return res.render('users/login', {
            errors: [
                {
                    param: 'correo',
                    msg: 'Usuario o contraseña incorrecto'
                }
            ]
        });
    }

    return res.render('users/login', {
        errors: [
            {
                param: 'correo',
                msg: 'No se encuentra el email en la base de datos'
            }
        ]
    });
}

module.exports = { obtenerLogin, procesarLogin }