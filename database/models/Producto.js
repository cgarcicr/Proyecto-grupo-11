module.exports = function( sequelize, dataTypes){
    let alias = "Producto";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        imagen: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.DECIMAL
        },
        stock: {
            type: dataTypes.INTEGER
        },
        id_categoria: {
            type: dataTypes.INTEGER
        }

    }

    let config = {
        tableName: "productos",
        timestamps: false
    }

    let Producto = sequelize.define( alias, cols, config );

    // Producto.associate = function(models){
    //     Producto.belongsTo(models.categorias,{
    //         as: "categorias",
    //         foreignKey: "id_categoria"
    //     })
    // }

    return Producto;
}