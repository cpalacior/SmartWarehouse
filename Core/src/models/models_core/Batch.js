const {Model, DataTypes} = require('sequelize');

const Batch_TABLE = 'batch';

class Batch extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: Batch_TABLE,
            modelName: 'Batch',
            timestamp: true
        }
    }
}

const BatchSchema = {
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
    input_date: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'input_date'
    },
    weight: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'weight'
    },
    number_of_packages: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'number_of_packages'
    }
};

module.exports = {Batch, BatchSchema};