/*
    Controllers: perfil
*/
const { request, response } = require('express');
const path = require('path');

let  obtenerPerfil = ( req, res = response)=>{
    res.render('users/perfilUsuario', { usuario: req.session.usuarioLogueado } );
}

module.exports = { obtenerPerfil }