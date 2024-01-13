const { Level } = require('../models/models_core/Level');
const { Slot } = require('../models/models_core/Slot');

const utils = require('../utils/functions')

// Retorna un json con todos las Levels en la base de datos
const listLevels = async(req,res) => {
    try{
        const levels = await Level.findAll();
        res.json(levels);
    } catch (error) {
        res.send(error);
    }
}
// Almacena en la base de datos un nuevo level
const createLevel = async(req,res) => {
    try{
        const id = req.body.SlotId;        
        //console.log(id);
        const slot = await Slot.findByPk(id)
        //console.log(slot);
        const levels = await Level.bulkCreate(
            [
                {
                    code:`${slot.code}L1`,
                    max_weigth:10,
                    height:3,
                    SlotId:id
                },
                {
                    code:`${slot.code}L2`,
                    max_weigth:10,
                    height:3,
                    SlotId:id
                },
                {
                    code:`${slot.code}L3`,
                    max_weigth:5,
                    height:2,
                    SlotId:id
                },
                {
                    code:`${slot.code}L4`,
                    max_weigth:2,
                    height:2,
                    SlotId:id
                }
            ]
        );
        res.json({'levels':levels})
    }
    catch (error) {
        res.send(error);
    }
}
// Retorna una Level pasandole la id como parametro

const getLevel = async(req,res) => {
    try{
       const {id} = req.params;
        const level = await Level.findByPk(id)
        if(!utils.ifNull404(res,level)){
        res.json(level)
        }
    }catch (error) {
        res.send(error);
    }
}
// Actualiza datos de una Level(que se la pasa la id por parametro) especificando los datos a actualizar en el body
const updateLevel = async(req,res) =>{
    try{
        const {id} = req.params;
        const level = await Level.findByPk(id);
        if(!utils.ifNull404(res,level)){
        await level.update(req.body);
        res.json({'level':level})
        }
    }
    catch (error) {
        res.send(error);
    }
}


// Elimina una Level pasandole un id por parametro
const deleteLevel = async(req,res) => {
    try{
        const {id} = req.params;
        const level = await Level.findByPk(id);
        if(!utils.ifNull404(res,level)){
        await level.destroy();
        res.json({'deleted':true})
        }
        
    }
    catch (error) {
        res.send(error);
    }
}

module.exports = {listLevels, createLevel, getLevel, updateLevel, deleteLevel};