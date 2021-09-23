function guestMiddleware( req, res, next){
    if( req.session.usuarioLogueado == undefined ){
        next();
    }else{
        return res.render('users/perfilUsuario', {  usuario: req.session.usuarioLogueado } );
    }
}

module.exports = guestMiddleware;