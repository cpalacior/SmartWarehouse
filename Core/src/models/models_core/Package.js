const {Model, DataTypes} = require('sequelize');

const Package_TABLE = 'package';

class Package extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: Package_TABLE,
            modelName: 'Package',
            timestamp: true
        }
    }
}

const PackageSchema = {
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
    weight: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'weight'
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
    output_date: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'output_date'
    },
    overlap: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'overlap'
    },
    category: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'category'
    },
    perishable: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        field: 'perishable'
    },
    expiration_date: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'expiration_date'
    },
    section: {
        allowNull: true,
        type: DataTypes.STRING,
        field: "section"
    },
    slot: {
        allowNull: true,
        type: DataTypes.STRING,
        field: "slot"
    },
    level: {
        allowNull: true,
        type: DataTypes.STRING,
        field: "level"
    }
};

module.exports = {Package, PackageSchema};