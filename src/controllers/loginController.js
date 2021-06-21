/*
    Controllers: login
*/
const { request, response } = require('express');
const path = require('path');

let  obtenerLogin = ( req, res = response)=>{
    res.sendFile( path.resolve(__dirname, '../views/users/login.html') );
}

module.exports = { obtenerLogin }