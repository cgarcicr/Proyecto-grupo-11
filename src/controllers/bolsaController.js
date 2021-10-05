/*
    Controllers: bolsa
*/
const { request, response } = require('express');
const db = require('../../database/models');

let verBolsa = ( req, res = response)=>{
    let suma = 0;
    req.session.bolsa.forEach(element => {
        suma = suma + parseInt(element.precio);
    });

    res.render('products/bolsaProducto',
        {
            ok: true,
            listaProductos: req.session.bolsa,
            suma
        });
};

let agregarProductoBolsa = ( req, res = response )=>{
    db.Producto.findOne({
        where: {
            id: req.params.id
        }
    }).then( resp =>{
        let producto = {
            id: resp.id,
            nombre: resp.nombre,
            imagen: resp.imagen,
            precio: resp.precio
        }
        req.session.bolsa.push(producto)
        res.redirect('/');
    });
}

let eliminarProductoBolsa = (req, res = response)=>{
    let productos = req.session.bolsa.filter( ( producto )=>{
        return producto.id != req.params.id;
    });

    req.session.bolsa = productos;

    let suma = 0;
    req.session.bolsa.forEach(element => {
        suma = suma + parseInt(element.precio);
    });

    res.render('products/bolsaProducto', {
        ok: true,
        listaProductos: req.session.bolsa,
        suma
    });
}

module.exports = { verBolsa, agregarProductoBolsa, eliminarProductoBolsa };