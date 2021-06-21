const express = require('express');
const path = require('path');

//Crear el servidor con express
const app = express();

//Configurar ejs como template engine
app.set('view engine','ejs');

//Configurar carpeta donde está las vistas
app.set('views', './src/views');

app.listen( 3000, ()=>{
    console.log('Servidor escuchando por el puerto 3000');
} );

//app.use( express.static( path.resolve(__dirname, '../public') ) );
app.use( express.static('public') );

//Routes
app.use( '/cannabis-market', require( './routes/main' ) );
app.use( '/cannabis-market/login', require( './routes/login' ) );
app.use( '/cannabis-market/registro', require( './routes/registro' ) );
app.use( '/cannabis-market/productos',require( './routes/productos' ) );

