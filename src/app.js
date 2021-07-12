require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

//Crear el servidor con express
const app = express();

//Configurar ejs como template engine
app.set('view engine','ejs');

//Configurar carpeta donde está las vistas
app.set('views', './src/views');

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

//Routes
app.use( '/', require( './routes/main' ) );
app.use( '/login', require( './routes/login' ) );
app.use( '/registro', require( './routes/registro' ) );
app.use( '/productos',require( './routes/productos' ) );

