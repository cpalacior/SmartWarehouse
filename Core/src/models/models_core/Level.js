const {Model, DataTypes} = require('sequelize');

const Level_TABLE = 'level';

class Level extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: Level_TABLE,
            modelName: 'Level',
            timestamp: true
        }
    }
}

const LevelSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    code: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'code'
    },
    max_weigth: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'max_weigth'
    },
    height: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'height'
    }
};

module.exports = {Level, LevelSchema};