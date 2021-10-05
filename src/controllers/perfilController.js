/*
    Controllers: perfil
*/
const { request, response } = require('express');
const path = require('path');
const db = require('../../database/models');
const { validationResult} = require('express-validator');

let  obtenerPerfil = ( req, res = response )=>{
    res.render('users/perfilUsuario', { usuario: req.session.usuarioLogueado } );
}

let editarPerfil = ( req, res = response )=>{
    let errors = validationResult( req );

    if( !errors.isEmpty() ){
        return res.render('users/perfilUsuario', { errors: errors.array(), usuario: req.body });
    }

    db.Cliente.update(
        {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            documento: req.body.documento,
            telefono: req.body.telefono,
            fecha_nacimiento: req.body.fecha_nacimiento,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            email:req.body.email
        },
        {
            where: { id: req.session.usuarioLogueado.id }
        }
    ).then( resp =>{
        req.body.avatar = req.session.usuarioLogueado.avatar;
        req.body.id = req.session.usuarioLogueado.id;
        req.session.usuarioLogueado = req.body;
        return res.render('users/perfilUsuario', { usuario: req.body });
    });

}

module.exports = { obtenerPerfil, editarPerfil }