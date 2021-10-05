/*
    Controllers: productos
*/
const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
const { validationResult} = require('express-validator');
const productos = path.join( __dirname, './../database/model/productos.json' );
const productosJson = JSON.parse( fs.readFileSync(productos),'utf-8' );
const db = require('../../database/models');

let nuevoProducto = ( req, res = response)=>{
    res.render('products/nuevoProducto');
};

let crearProducto = ( req = request, res = response)=>{
    let errors = validationResult( req );

    if( !errors.isEmpty() ){
        return res.render('products/nuevoProducto', { errors: errors.array(), old: req.body });
    }

    db.Producto.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.file.filename,
        precio: req.body.precio,
        stock: req.body.stock,
        id_categoria: req.body.id_categoria
    }).then( resp =>{
        return res.render( 'products/nuevoProducto' );
    });

}

let editarProducto = ( req, res = response)=>{
    let { id } = req.params
    let producto = productosJson.filter( resp=> resp.id == id);
    res.render('products/editarProducto',{
        ok: true,
        producto
    });
};

let modificarProducto = ( req = request, res = response )=>{
    let listaProductos = productosJson;
    let { id, nombre, descripcion, precio } = req.body;
    listaProductos.forEach(element => {
        if( element.id == id){
            element.nombre = nombre;
            element.descripcion = descripcion;
            element.precio = precio
            }
    });
    fs.writeFile('./src/database/model/productos.json', JSON.stringify( listaProductos, null, ' ' ), ( err )=>{
        if( err ){
            console.log( 'El error es: ' + err);
        }else{
            console.log( 'Actualizado' );
        }
    });
    res.redirect(`/productos/editarProducto/${ id }`);
}

let borrarProducto = ( req = request, res = response )=>{
    let { id } = req.params
    let listaProductos = productosJson.filter( resp => resp.id != id);
    fs.writeFile('./src/database/model/productos.json', JSON.stringify( listaProductos, null, ' ' ), ( err )=>{
        if( err ){
            console.log( 'El error es: ' + err);
        }else{
            console.log( 'Actualizado' );
        }
    });
    res.render('products/listarProductos',{
        ok: true,
        listaProductos
    });
}

let listarProductos = ( req, res = response )=>{

    db.Producto.findAll({
        where: {
            id_categoria : req.params.id
        }
    }
    )
    .then( resp =>{
        res.render( 'products/listarProductos',
        {
            ok: true,
            listaProductos: resp,
            id_categoria: req.params.id
        });
    });
}

let obtenerProducto = ( req = request, res = response)=>{
    let { id } = req.params;

    db.Producto.findOne({
        where: {
            id: id
        }
    }).then( resp =>{
        res.render( "products/detalleProducto",
        {
            ok:true,
            producto: resp
        });
    });
}


module.exports = { nuevoProducto, editarProducto, listarProductos, obtenerProducto, crearProducto, modificarProducto, borrarProducto };