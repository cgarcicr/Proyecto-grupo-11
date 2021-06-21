const express = require('express');
const path = require('path');

//Crear el servidor con express
const app = express();

app.listen( 3000, ()=>{
    console.log('Servidor escuchando por el puerto 3000');
} );

app.use( express.static( path.resolve(__dirname, '../public') ) );

//Routes
app.use( '/cannabis-market', require( './routes/main' ) );
app.use( '/cannabis-market/login', require( './routes/login' ) );
app.use( '/cannabis-market/registro', require( './routes/registro' ) );
