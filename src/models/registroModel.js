/*
    Model: registro
*/
const fs = require('fs');
const path = require('path');

const RegistroModel = {
    usuariosBd: path.join( __dirname, './../database/model/usuarios.json' ),

    generarId: function(){
        let usuarios = this.obtenerTodosUsuarios();
        let ultimoUsuario = usuarios.pop();
        if( ultimoUsuario ){
            return ultimoUsuario.id + 1;
        }
        return 1;
    },

    crearUsuario: function( usuario ){
        let usuarios = this.obtenerTodosUsuarios();
        let nuevoUsuario = {
            id: this.generarId(),
            ...usuario
        }

        usuarios.push( nuevoUsuario );
        fs.writeFileSync( this.usuariosBd, JSON.stringify( usuarios, null, ' '),( err )=>{
            if( err ){
                console.log( 'El error es: ' + err);
            }else{
                console.log( 'Actualizado' );
            }
        } );
        return nuevoUsuario;
    },

    obtenerDatosBd: function(){
        return JSON.parse( fs.readFileSync( this.usuariosBd ),'utf-8' );
    },

    obtenerTodosUsuarios: function(){
        return this.obtenerDatosBd();
    },

    obtenerPorId: function( id ){
        let usuarios = this.obtenerTodosUsuarios();
        let usuario = usuarios.find( usuario => usuario.id == id);
        return usuario;
    },

    obtenerPorEmail: function( campo, text){
        let usuarios = this.obtenerTodosUsuarios();
        let usuario = usuarios.find( usuario => usuario[campo] == text );
        return usuario;
    },

    eliminar: function( id ){
        let usuarios = this.obtenerTodosUsuarios();
        let usuariosActuales = usuarios.filter( usuario => usuario.id != id );
        fs.writeFileSync( this.usuariosBd, JSON.stringify( usuariosActuales, null, ' ') );
        return true;
    }


}

module.exports = RegistroModel;
