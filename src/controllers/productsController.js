/*
    Controllers: productos
*/
const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
// let productos = fs.readFileSync( __dirname + './../database/model/productos.json', 'utf-8' );
// let productosJson = JSON.parse( productos );
const productos = path.join( __dirname, './../database/model/productos.json' );
const productosJson = JSON.parse( fs.readFileSync(productos),'utf-8' );

let nuevoProducto = ( req, res = response)=>{
    res.render('products/nuevoProducto');
};

let crearProducto = ( req = request, res = response)=>{
    let listaProductos = productosJson;
    let { nombre, descripcion, precio } = req.body;
    let newProducto = {
        id: listaProductos.length + 1,
        nombre: nombre,
        descripcion: descripcion,
        precio: '$' + precio,
        imagen: "/images/capsulas_extracto_equilibrium.png",
    }
    listaProductos.push( newProducto );
        fs.writeFile('./src/database/model/productos.json', JSON.stringify( listaProductos, null, ' ' ), ( err )=>{
            if( err ){
                console.log( 'El error es: ' + err);
            }else{
                console.log( 'Actualizado' );
            }
        });
    res.redirect('/productos');
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
    res.render('products/listadoProducto',{
        ok: true,
        listaProductos
    });
}

let listarProductos = ( req, res = response )=>{
    let listaProductos = productosJson;
    res.render('./products/listadoProducto',
    {
        ok: true,
        listaProductos
    });
}

let obtenerProducto = ( req = request, res = response)=>{
    let { id } = req.params;
    let producto = productosJson.filter( resp => resp.id == id );
    res.render( 'products/detalleProducto',
    {
        ok:true,
        producto
    });
}


module.exports = { nuevoProducto, editarProducto, listarProductos, obtenerProducto, crearProducto, modificarProducto, borrarProducto };