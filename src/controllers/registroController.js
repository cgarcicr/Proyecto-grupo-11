/*
    Controllers: registro
*/
const { request, response } = require('express');
const path = require('path');

let  obtenerRegistro = ( req, res = response)=>{
    //res.render( path.resolve(__dirname, '../views/users/registro') );
    res.render('users/registro');
}

module.exports = { obtenerRegistro }