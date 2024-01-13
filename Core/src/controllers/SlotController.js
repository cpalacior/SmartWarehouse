const { Slot } = require('../models/models_core/Slot');
const SlotMongo = require('../models/models_ai/Slot');
const SectionMongo = require('../models/models_ai/Section');
const { Level } = require('../models/models_core/Level');
const utils = require('../utils/functions');
const { Section } = require('../models/models_core/Section');

// Retorna un json con todos las Slots en la base de datos
const listSlots = async(req,res) => {
    try{
        const slots = await Slot.findAll(  {include: [
            {
              model: Section,
              where: { AdminId: req.header['id'] },
            }]});
        res.json(slots);
    } catch (error) {
        res.send(error);
    }
}
// Almacena en la base de datos un nuevo slot
const createSlot = async(req,res) => {
    try{
        const slot = await Slot.create(req.body);
        try{
        const count = await Slot.count({
            where: { SectionId: slot.SectionId },
          });
          
        await slot.update({code:`S${slot.SectionId}SL${count}`})
        res.json({'slot':slot})
    }
        catch(error){
            console.log(error)
            res.status(400).send(error);
            return;
        }
        
        
    }
    catch (error) {
        res.send(error);
    }
}

const creteSlotBulk = async(req,res) => {
    try{
        const num_of_slots = req.body.num_of_slots;
        const distance_to_door_array = req.body.distance_to_door
        const section_code = req.body.section_code
        delete req.body.num_of_slots;
        delete req.body.section_code;

        for(let i =0;i<num_of_slots;i++){
            req.body.code = `${section_code}SL${i+1}`
            req.body.distance_to_door = distance_to_door_array[i]
            let slot = await Slot.create(req.body)
            const slotMongo = SlotMongo(req.body);
            slotMongo.levels = 4;
            slotMongo.SectionId = req.body['SectionId'];
            slotMongo.save()
            await Level.bulkCreate(
                [
                    {
                        code:`${slot.code}L1`,
                        max_weigth:10,
                        height:3,
                        SlotId:slot.id
                    },
                    {
                        code:`${slot.code}L2`,
                        max_weigth:10,
                        height:3,
                        SlotId:slot.id
                    },
                    {
                        code:`${slot.code}L3`,
                        max_weigth:5,
                        height:2,
                        SlotId:slot.id
                    },
                    {
                        code:`${slot.code}L4`,
                        max_weigth:2,
                        height:2,
                        SlotId:slot.id
                    }
                ]
            );
        }
        res.json({'slots_created':true});
    }
    catch(error){
        console.log(error)
        res.status(400).send(error);
        return;
    }
    
}
// Retorna una Slot pasandole la id como parametro

const getSlot = async(req,res) => {
    try{
       const {id} = req.params;
        const slot = await Slot.findByPk(id)
        if(!utils.ifNull404(res,slot)){
        res.json(slot)
        }
    }catch (error) {
        res.send(error);
    }
}
// Actualiza datos de una Slot(que se la pasa la id por parametro) especificando los datos a actualizar en el body
const updateSlot = async(req,res) =>{
    try{
        const {id} = req.params;
        const slot = await Slot.findByPk(id);
        const slotMongo = await SlotMongo.find({ code: slot.code}).exec();
        if(!utils.ifNull404(res,slotMongo)){
            const query = { code: slot.code };
            const update = { distance_to_door: req.body["distance_to_door"]};
            await SlotMongo.findOneAndUpdate(query, update);
        }
        if(!utils.ifNull404(res,slot)){
        await slot.update(req.body);
        res.json({'slot':slot})
        }
    }
    catch (error) {
        res.send(error);
    }
}


// Elimina una Slot pasandole un id por parametro
const deleteSlot = async(req,res) => {
    try{
        const {id} = req.params;
        const slot = await Slot.findByPk(id);
        const slotMongo = await SlotMongo.find({ code: slot.code}).exec();
        if(slot.SectionId){
        const section = await Section.findByPk(slot.SectionId)
        const num_of_slots = section.num_of_slots - 1
        await section.update({num_of_slots:num_of_slots})
        await SectionMongo.findOneAndUpdate({code: section.code}, {num_of_slots:num_of_slots});
        }
        if(!utils.ifNull404(res,slot)){
            await SlotMongo.deleteOne({ code: slot.code });
            }
        if(!utils.ifNull404(res,slot)){
        await slot.destroy();
        res.json({'deleted':true})
        }
        
    }
    catch (error) {
        console.log(error)
        res.send({error:error});
    }
}

module.exports = {listSlots, createSlot, getSlot, updateSlot, deleteSlot, creteSlotBulk};