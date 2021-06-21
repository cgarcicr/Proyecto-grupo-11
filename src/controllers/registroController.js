/*
    Controllers: registro
*/
const { request, response } = require('express');
const path = require('path');

let  obtenerRegistro = ( req, res = response)=>{
    res.sendFile( path.resolve(__dirname, '../views/registro.html') );
}

module.exports = { obtenerRegistro }