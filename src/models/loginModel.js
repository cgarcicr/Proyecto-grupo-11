/*
    Model: Login
*/
const fs = require('fs');
const path = require('path');

const LoginModel = {
    usuariosBd: path.join( __dirname, './../database/model/usuarios.json' ),

    obtenerDatosBd: function(){
        return JSON.parse( fs.readFileSync( this.usuariosBd ),'utf-8' );
    },

    obtenerTodosUsuarios: function(){
        return this.obtenerDatosBd();
    },

    obtenerUsuarioPorId: function( id ){
        let usuarios = this.obtenerTodosUsuarios();
        let usuario = usuarios.find( usuario => usuario.id == id);
        return usuario;
    },

    obtenerUsuarioPorEmail: function( campo, text){
        let usuarios = this.obtenerTodosUsuarios();
        let usuario = usuarios.find( usuario => usuario[campo] == text );
        return usuario;
    }

}

module.exports = LoginModel;
