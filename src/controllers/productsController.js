/*
    Controllers: productos
*/
const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
let productos = fs.readFileSync( __dirname + '../../database/model/productos.json', 'utf-8' );
let productosJson = JSON.parse( productos );

let nuevoProducto = ( req, res = response)=>{
    res.render('products/nuevoProducto');
};

let editarProducto = ( req, res = response)=>{
    res.render('products/editarProducto');
};

let listarProductos = ( req, res = response )=>{
    let listaProductos = productosJson;
    res.render('products/listadoProducto',
    {
        ok: true,
        listaProductos
    });
}

let obtenerProducto = ( req = request, res = response)=>{
    let { id } = req.params;
    let producto = productosJson.filter( resp => resp.id == id );
    console.log( producto );
    res.render( 'products/detalleProducto',
    {
        ok:true,
        producto
    });
}


module.exports = { nuevoProducto, editarProducto, listarProductos, obtenerProducto };