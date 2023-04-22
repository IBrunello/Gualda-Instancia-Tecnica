const {DataTypes, Sequelize}= require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('planet', {
        id:{
            type:DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        rotation_period:{
            type:DataTypes.STRING,
            allowNull: false
        },
        orbital_period:{
            type:DataTypes.STRING,
            allowNull: false
        },
        diameter:{
            type:DataTypes.STRING,
            allowNull: false
        },
        climate:{
            type:DataTypes.STRING,
            allowNull: false
        },
        gravity:{
            type:DataTypes.STRING,
            allowNull: false
        },
        terrain:{
            type:DataTypes.STRING,
            allowNull: false
        },
        surface_water:{
            type:DataTypes.STRING,
            allowNull: false
        },
        population:{
            type:DataTypes.STRING,
            allowNull: false
        },
    },{timestamps:false})}