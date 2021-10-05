const LoginModel = require('../src/models/loginModel');

function userLoggedMiddleware( req, res, next){
    //Creación de una variable local, puede ser utilizada en todas las vistas.
    res.locals.estaLogueado = false;

    let correoCookie = req.cookies.correoUsuario;
    let usuarioCookie = LoginModel.obtenerUsuarioPorEmail('email', correoCookie);

    if( usuarioCookie ){
        req.session.usuarioLogueado = usuarioCookie;
    }

    if( req.session.usuarioLogueado ){
        res.locals.estaLogueado = true;
        res.locals.rol = req.session.usuarioLogueado.rol;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
    }

    next();
}

module.exports = userLoggedMiddleware;