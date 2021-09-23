/*
    Controllers: logout
*/
const { request, response } = require('express');

let  logout = ( req, res = response)=>{
    //Destruir la session
    req.session.destroy();
    //Destruir la cookie
    res.clearCookie('correoUsuario');
    return res.redirect('/');
}

module.exports = { logout }