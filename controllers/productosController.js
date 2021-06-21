/*
    Controllers: productos
*/
const { request, response } = require('express');
const path = require('path');

let  productosController = {nuevoProducto : ( req, res = response)=>{
    res.sendFile( path.resolve(__dirname, '../views/productos/nuevoProducto.html') );
},
editProducto : ( req, res = response)=>{
    res.sendFile( path.resolve(__dirname, '../views/productos/editProducto.html') );}
};

module.exports = {productosController};