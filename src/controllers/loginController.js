/*
    Controllers: login
*/
const { request, response } = require('express');
const path = require('path');

let  obtenerLogin = ( req, res = response)=>{
    res.render( path.resolve(__dirname, '../views/users/login') );
}

module.exports = { obtenerLogin }