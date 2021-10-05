module.exports = function( sequelize, dataTypes){
    let alias = "Cliente";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        contrasenia: {
            type: dataTypes.STRING
        },
        rol: {
            type: dataTypes.INTEGER
        },
        documento: {
            type: dataTypes.STRING
        },
        fecha_nacimiento: {
            type: dataTypes.DATE
        },
        telefono: {
            type: dataTypes.STRING
        },
        direccion: {
            type: dataTypes.STRING
        },
        ciudad: {
            type: dataTypes.STRING
        },
        pais: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        }

    }

    let config = {
        tableName: "clientes",
        timestamps: false
    }

    let Cliente = sequelize.define( alias, cols, config );
    return Cliente;
}