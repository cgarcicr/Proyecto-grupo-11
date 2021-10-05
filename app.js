require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

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
app.use(session(
{
    secret: 'Secreto!!!',
    resave: false,
    saveUninitialized: false
}
));

//Uso de cookies
app.use(cookies());

//Uso de middleware usuario logueado
app.use(userLoggedMiddleware);

//Routes
app.use( '/', require( './src/routes/main' ) );
app.use( '/login', require( './src/routes/login' ) );
app.use( '/logout', require( './src/routes/logout') );
app.use( '/registro', require( './src/routes/registro' ) );
app.use( '/productos',require( './src/routes/productos' ) );
app.use( '/perfil', require( './src/routes/perfil' ) );
app.use( '/listarProductos',require( './src/routes/listarProductos' ) );
app.use( '/bolsa', require( './src/routes/bolsa' ) );
