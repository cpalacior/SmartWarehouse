const { Section } = require('../models/models_core/Section');
const SectionMongo = require('../models/models_ai/Section');
const SlotMongo = require('../models/models_ai/Slot');
const utils = require('../utils/functions')

// Retorna un json con todos las sectiones en la base de datos
const listSections = async(req,res) => {
    try{
        const section = await Section.findAll({where:
            {
                AdminId:req.header['id']
            }
            });
        res.json(section);
    } catch (error) {
        res.send(error);
    }
}
// Almacena en la base de datos una nuevo section
const createSection = async(req,res) => {
    try{

        req.body['AdminId'] = req.header['id']
        const section = await Section.create(req.body);
        const sectionMongo = SectionMongo(req.body);
        sectionMongo.id = section.id
        sectionMongo.dimensions = req.body['width'] * req.body['depth'];
        sectionMongo.distance_to_door = Math.floor(Math.random() * 30);
        num_of_sections = await Section.count({
            where: {
                AdminId:req.header['id']
            }
        })
        sectionMongo.code = `S${num_of_sections}`
        sectionMongo.save()
        section.update({'code':`S${num_of_sections}`});
        res.json({'section':section})
    }
    catch (error) {
        res.send(error);
    }
}
// Retorna una section pasandole la id como parametro

const getSection = async(req,res) => {
    try{
       const {id} = req.params;
        const section = await Section.findByPk(id)
        if(!utils.ifNull404(res,section)){
            res.json(section)
            }
    }catch (error) {
        res.send(error);
    }
}
// Actualiza datos de una section(que se la pasa la id por parametro) especificando los datos a actualizar en el body
const updateSection = async(req,res) =>{
    try{
        const {id} = req.params;
        const section = await Section.findByPk(id);
        const sectionMongo = await SectionMongo.find({ code: section.code}).exec();
        if(!utils.ifNull404(res,sectionMongo)){
            const query = { code: section.code };
            const update = { name:req.body["name"],
                        width: req.body["width"],
                        depth: req.body["depth"],
                        num_of_slots: req.body["num_of_slots"],
                        dimensions: req.body["depth"] * req.body["width"]
                        };
            await SectionMongo.findOneAndUpdate(query, update);
            }
        
        if(!utils.ifNull404(res,section)){
            await section.update(req.body);
            res.json({'section':section})
            }
    }
    catch (error) {
        res.send(error);
    }
}


// Elimina una section pasandole un id por parametro
const deleteSection = async(req,res) => {
    try{
        const {id} = req.params;
        const section = await Section.findByPk(id);
        const sectionMongo = await SectionMongo.find({ code: section.code}).exec();
        if(!utils.ifNull404(res,sectionMongo)){
            const query = { code: section.code };
            await SlotMongo.deleteMany({ SectionId: section.id});
            await SectionMongo.deleteOne(query);
        }
        if(!utils.ifNull404(res,section)){
            await section.destroy();
            res.json({'deleted':true})
            }
    }
    catch (error) {
        res.send(error);
    }
}

module.exports = {listSections, createSection, getSection, updateSection, deleteSection};