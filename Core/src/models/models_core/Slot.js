const {Model, DataTypes} = require('sequelize');

const Slot_TABLE = 'slot';

class Slot extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: Slot_TABLE,
            modelName: 'Slot',
            timestamp: true
        }
    }
}

const SlotSchema = {
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
    height: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'height'
    },
    width: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'width'
    },
    depth: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'depth'
    },
    distance_to_door: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'distance_to_door'
    }
};

module.exports = {Slot, SlotSchema};