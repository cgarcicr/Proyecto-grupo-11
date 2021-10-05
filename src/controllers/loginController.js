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
const db = require('../../database/models');

let  obtenerLogin = ( req, res = response)=>{
    return res.render('users/login');
}

let procesarLogin = (req, res = response)=>{
    let errors = validationResult( req );
    // let usuarioLogueado = LoginModel.obtenerUsuarioPorEmail( 'email', req.body.email );

    db.Cliente.findOne({
        where: {
            email: req.body.email
        }
    }).then( resp =>{
        if( resp.dataValues.email == req.body.email ){
            let okPassword = bcrypt.compareSync( req.body.contrasenia, resp.dataValues.contrasenia );
            if( okPassword ){
                delete resp.dataValues.contrasenia;
                req.session.usuarioLogueado = resp.dataValues;
                req.session.bolsa = [];
                //Creación de cookie
                if( req.body.recordarme ){
                    res.cookie('correoUsuario', req.body.email, { maxAge: (1000 * 60) * 60 })
                }
                return res.redirect('/');
            }
            return res.render('users/login', {
                errors: [
                    {
                        param: 'email',
                        msg: 'Usuario o contraseña incorrecto'
                    }
                ]
            });
        }
    }).catch( resp =>{
        return res.render('users/login', {
            errors: [
                {
                    param: 'email',
                    msg: 'Usuario o contraseña incorrecto'
                }
            ]
        });
    });
}

module.exports = { obtenerLogin, procesarLogin }