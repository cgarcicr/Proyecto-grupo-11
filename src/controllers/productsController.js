/*
    Controllers: productos
*/
const { request, response } = require('express');
const path = require('path');

let  productsController = {
    nuevoProducto : ( req, res = response)=>{
            //res.render( path.resolve(__dirname, '../views/products/nuevoProducto') );
            res.render('products/nuevoProducto');
        },
    editarProducto : ( req, res = response)=>{
            //res.render( path.resolve(__dirname, '../views/products/editProducto') );
            res.render('products/editarProducto');
        }
};

module.exports = productsController ;