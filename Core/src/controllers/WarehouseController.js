const { Warehouse } = require('../models/models_core/Warehouse');
const utils = require('../utils/functions')

// Retorna un json con todos las bodegas en la base de datos
const listWarehouse = async(req,res) => {
    try{
        const warehouses = await Warehouse.findAll();
        res.json(warehouses);
    } catch (error) {
        res.send(error);
    }
}
// Almacena en la base de datos una nuevo warehouse
const createWarehouse = async(req,res) => {
    try{
        const warehouse = await Warehouse.create(req.body);
        res.json({'warehouse':warehouse})
    }
    catch (error) {
        res.send(error);
    }
}
// Retorna una warehouse pasandole la id como parametro

const getWarehouse = async(req,res) => {
    try{
       const {id} = req.params;
        const warehouse = await Warehouse.findByPk(id)
        if(!utils.ifNull404(res,warehouse)){
            res.json(warehouse)
            }
    }catch (error) {
        res.send(error);
    }
}
// Actualiza datos de una warehouse(que se la pasa la id por parametro) especificando los datos a actualizar en el body
const updateWarehouse = async(req,res) =>{
    try{
        const {id} = req.params;
        const warehouse = await Warehouse.findByPk(id);
        if(!utils.ifNull404(res,warehouse)){
            await warehouse.update(req.body);
            res.json({'warehouse':warehouse})
            }
    }
    catch (error) {
        res.send(error);
    }
}


// Elimina una warehouse pasandole un id por parametro
const deleteWarehouse = async(req,res) => {
    try{
        const {id} = req.params;
        const warehouse = await Warehouse.findByPk(id);
        if(!utils.ifNull404(res,warehouse)){
            await warehouse.destroy();
            res.json({'deleted':true})
            }
    }
    catch (error) {
        res.send(error);
    }
}

module.exports = {listWarehouse, createWarehouse, getWarehouse, updateWarehouse, deleteWarehouse};