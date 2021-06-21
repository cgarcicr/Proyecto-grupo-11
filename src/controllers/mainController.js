/*
    Controllers: main
*/
const { request, response } = require('express');
const path = require('path');

let  obtenerMain = ( req, res = response)=>{
    res.render( path.resolve(__dirname, '../views/index.ejs') );
}

module.exports = { obtenerMain }