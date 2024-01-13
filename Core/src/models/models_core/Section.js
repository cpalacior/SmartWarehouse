const {Model, DataTypes} = require('sequelize');

const Section_TABLE = 'section';

class Section extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: Section_TABLE,
            modelName: 'Section',
            timestamp: true
        }
    }
}

const SectionSchema = {
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
    code: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'code'
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
    num_of_slots: {
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'num_of_slots'
    }
};
module.exports = {Section, SectionSchema};