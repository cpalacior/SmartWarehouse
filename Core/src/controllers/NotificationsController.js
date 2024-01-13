const { Notification } = require('../models/models_core/Notifications');

const utils = require('../utils/functions')

// Retorna un json con todos las Notifications en la base de datos
const listNotifications = async(req,res) => {
    try{
        const notifications = await Notification.findAll({where:
            {
                AdminId:req.header['id']
            }
            });
        res.json(notifications);
    } catch (error) {
        res.send(error);
    }
}
// Almacena en la base de datos un nuevo notification
const createNotification = async(req,res) => {
    try{
        console.log(req.headers)
        req.body['AdminId'] = req.header['id']
        const notification = await Notification.create(req.body);
        res.json({'notification':notification})
    }
    catch (error) {
        res.json(error);
    }
}
// Retorna una Notification pasandole la id como parametro

const getNotification = async(req,res) => {
    try{
       const {id} = req.params;
        const notification = await Notification.findByPk(id)
        if(!utils.ifNull404(res,notification)){
        res.json(notification)
        }
    }catch (error) {
        res.send(error);
    }
}
// Actualiza datos de una Notification(que se la pasa la id por parametro) especificando los datos a actualizar en el body
const updateNotification = async(req,res) =>{
    try{
        const {id} = req.params;
        const notification = await Notification.findByPk(id);
        if(!utils.ifNull404(res,notification)){
        await notification.update(req.body);
        res.json({'notification':notification})
        }
    }
    catch (error) {
        res.send(error);
    }
}


// Elimina una Notification pasandole un id por parametro
const deleteNotification = async(req,res) => {
    try{
        const {id} = req.params;
        const notification = await Notification.findByPk(id);
        if(!utils.ifNull404(res,notification)){
        await notification.destroy();
        res.json({'deleted':true})
        }
        
    }
    catch (error) {
        res.send(error);
    }
}

module.exports = {listNotifications, createNotification, getNotification, updateNotification, deleteNotification};