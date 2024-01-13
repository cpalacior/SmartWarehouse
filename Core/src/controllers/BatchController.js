const { Batch } = require('../models/models_core/Batch');
const utils = require('../utils/functions')

// Retorna un json con todos las Batchs en la base de datos
const listBatches = async(req,res) => {
    try{
        const batches = await Batch.findAll({where:
            {
                AdminId:req.header['id']
            }
            });
        res.json(batches);
    } catch (error) {
        res.send(error);
    }
}
// Almacena en la base de datos un nuevo batch
const createBatch = async(req,res) => {
    try{
        req.body['AdminId'] = req.header['id']
        const batch = await Batch.create(req.body);
        num_of_batches = await Batch.count({
            where: {
                AdminId:req.header['id']
            }
        })
        batch.update({'code':`B${num_of_batches}`})
        res.json({'batch':batch})
    }
    catch (error) {
        res.send(error);
    }
}
// Retorna una Batch pasandole la id como parametro

const getBatch = async(req,res) => {
    try{
       const {id} = req.params;
        const batch = await Batch.findByPk(id)
        if(!utils.ifNull404(res,batch)){
        res.json(batch)
        }
    }catch (error) {
        res.send(error);
    }
}
// Actualiza datos de una Batch(que se la pasa la id por parametro) especificando los datos a actualizar en el body
const updateBatch = async(req,res) =>{
    try{
        const {id} = req.params;
        const batch = await Batch.findByPk(id);
        if(!utils.ifNull404(res,batch)){
        await batch.update(req.body);
        res.json({'batch':batch})
        }
    }
    catch (error) {
        res.send(error);
    }
}


// Elimina una Batch pasandole un id por parametro
const deleteBatch = async(req,res) => {
    try{
        const {id} = req.params;
        const batch = await Batch.findByPk(id);
        if(!utils.ifNull404(res,batch)){
        await batch.destroy();
        res.json({'deleted':true})
        }
        
    }
    catch (error) {
        res.send(error);
    }
}

module.exports = {listBatches, createBatch, getBatch, updateBatch, deleteBatch};