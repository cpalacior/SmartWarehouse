const {Model, DataTypes} = require('sequelize');

const Admin_TABLE = 'admin';

class Admin extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: Admin_TABLE,
            modelName: 'Admin',
            timestamp: true
        }
    }
}

const AdminSchema = {
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
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'password',
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'email',
        unique: true,
        validate:{
            isEmail: true
        }
    },
    address: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'address'
    },
    phone: {
        allowNull: false,
        type: DataTypes.BIGINT,
        field: 'phone',
        validate: {
            isNumeric: true,
            min: 10
        }
    }
};

module.exports = {Admin, AdminSchema};