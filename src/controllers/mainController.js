/*
    Controllers: main
*/
const { request, response } = require('express');
const path = require('path');

let  obtenerMain = ( req, res = response)=>{
    res.sendFile( path.resolve(__dirname, '../views/index.html') );
}

module.exports = { obtenerMain }