/*
    Controllers: productos
*/
const { request, response } = require('express');
const path = require('path');

let  productsController = {nuevoProducto : ( req, res = response)=>{
    res.render( path.resolve(__dirname, '../views/products/nuevoProducto') );
},
editProducto : ( req, res = response)=>{
    res.render( path.resolve(__dirname, '../views/products/editProducto') );}
};

module.exports = {productsController};