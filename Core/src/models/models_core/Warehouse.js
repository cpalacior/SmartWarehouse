const {Model, DataTypes} = require('sequelize');

const Warehouse_TABLE = 'warehouse';

class Warehouse extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: Warehouse_TABLE,
            modelName: 'Warehouse',
            timestamp: true
        }
    }
}

const WarehouseSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'name'
    },
    location: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'location'
    },
    size: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'size',
        validate: {
            isNumeric: true,
            min: 1
        }
    },
};

module.exports = {Warehouse, WarehouseSchema};