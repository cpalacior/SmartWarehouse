const {Model, DataTypes} = require('sequelize');

const Notif_TABLE = 'notification';

class Notification extends Model{
    static config(sequelize){
        return {
            sequelize,
            tableName: Notif_TABLE,
            modelName: 'Notification',
            timestamp: true
        }
    }
}

const NotifSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    message: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: 'message'
    }
};

module.exports = {Notification, NotifSchema};