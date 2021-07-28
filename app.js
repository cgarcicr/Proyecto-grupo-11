require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

//Crear el servidor con express
const app = express();

//Configurar ejs como template engine
app.set('view engine','ejs');

//Configurar carpeta donde está las vistas
//app.set('view engine', 'ejs');

app.listen( process.env.PORT || 3005, ()=>{
    console.log( 'Servidor escuchando por el puerto ' + process.env.PORT );
} );

//app.use( express.static( path.resolve(__dirname, '../public') ) );
app.use( express.static('public') );

//Captura de información en formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Sobre escribir método original forms
app.use(methodOverride('_method'));

//Session a nivel global
app.use(session({ secret: 'Secreto!!!'}));

//Routes
app.use( '/', require( './src/routes/main' ) );
app.use( '/login', require( './src/routes/login' ) );
app.use( '/registro', require( './src/routes/registro' ) );
app.use( '/productos',require( './src/routes/productos' ) );

