/*
    Controllers: productos
*/
const { request, response } = require('express');
const path = require('path');

let  productsController = {nuevoProducto : ( req, res = response)=>{
    res.sendFile( path.resolve(__dirname, '../views/products/nuevoProducto.html') );
},
editProducto : ( req, res = response)=>{
    res.sendFile( path.resolve(__dirname, '../views/products/editProducto.html') );}
};

module.exports = {productsController};