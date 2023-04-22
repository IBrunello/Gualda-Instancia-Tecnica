const {DataTypes,Sequelize}= require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('starship', {
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
        model:{
            type:DataTypes.STRING,
            allowNull: false
        },
        manufacturer:{
            type:DataTypes.STRING,
            allowNull: false
        },
        cost_in_credits:{
            type:DataTypes.STRING,
            allowNull: false
        },
        length:{
            type:DataTypes.STRING,
            allowNull: false
        },
        max_atmosphering_speed:{
            type:DataTypes.STRING,
            allowNull: false
        },
        crew:{
            type:DataTypes.STRING,
            allowNull: false
        },
        passengers:{
            type:DataTypes.STRING,
            allowNull: false
        },
        cargo_capacity:{
            type:DataTypes.STRING,
            allowNull: false
        },
        consumables:{
            type:DataTypes.STRING,
            allowNull: false
        },
        hyperdrive_rating:{
            type:DataTypes.STRING,
            allowNull: false
        },
        MGLT:{
            type:DataTypes.STRING,
            allowNull: false
        },
        starship_class:{
            type:DataTypes.STRING,
            allowNull: false
        },
    },{timestamps:false})}