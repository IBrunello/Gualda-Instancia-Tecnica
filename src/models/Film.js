const {DataTypes}= require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('film', {
        episode_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        title:{
            type:DataTypes.STRING,
            allowNull: false
        },
        opening_crawl:{
            type:DataTypes.TEXT,
            allowNull: false
        },
        director:{
            type:DataTypes.STRING,
            allowNull: false
        },
        producer:{
            type:DataTypes.STRING,
            allowNull: false
        },
        release_date:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },{timestamps:false})};