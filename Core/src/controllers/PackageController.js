const { Package } = require('../models/models_core/Package');
const {Batch} = require('../models/models_core/Batch')
const utils = require('../utils/functions')

// Retorna un json con todos las Packages en la base de datos
const listPackages = async(req,res) => {
    try{
        const packages = await Package.findAll({include: [
            {
              model: Batch,
              where: { AdminId: req.header['id'] },
            }]});
        res.json(packages);
    } catch (error) {
        res.send(error);
    }
}
// Almacena en la base de datos un nuevo package
const createPackage = async(req,res) => {
    try{
        const { number_of_packages, input_date,weight } = req.body;
        const info_packages = req.body.additionalRows;
        const batch = {
            number_of_packages:number_of_packages,
            input_date:input_date,
            weight:weight,
            AdminId:req.header['id']
        }
        const new_batch = await Batch.create(batch);
        num_of_batches = await Batch.count({
            where: {
                AdminId:req.header['id']
            }
        })
        await new_batch.update({code:`B${num_of_batches}`});
        for (let i = 0; i < info_packages.length; i++){
            info_packages[i].BatchId = new_batch.id;
            info_packages[i].code = `${new_batch.code}-${i+1}`;
            if(info_packages[i].expiration_date != null){
                info_packages[i].perishable = true;
            }
        }
        const packages = await Package.bulkCreate(info_packages);
  
        res.json({'packages':packages})
    }
    catch (error) {
        res.send(error);
    }
}

// Retorna una Package pasandole la id como parametro
const getPackage = async(req,res) => {
    try{
       const {id} = req.params;
        const package = await Package.findByPk(id)
        if(!utils.ifNull404(res,package)){
        res.json(package)
        }
    }catch (error) {
        res.send(error);
    }
}
// Actualiza datos de una Package(que se la pasa la id por parametro) especificando los datos a actualizar en el body
const updatePackage = async(req,res) =>{
    try{
        const {id} = req.params;
        const package = await Package.findByPk(id);
        if(!utils.ifNull404(res,package)){
        await package.update(req.body);
        res.json({'package':package})
        }
    }
    catch (error) {
        res.send(error);
    }
}


// Elimina una Package pasandole un id por parametro
const deletePackage = async(req,res) => {
    try{
        const {id} = req.params;
        const package = await Package.findByPk(id);
        if(!utils.ifNull404(res,package)){
        await package.destroy();
        res.json({'deleted':true})
        }
        
    }
    catch (error) {
        res.send(error);
    }
}

const setLocation = async(req,res) => {
    try{
        console.log(`IA: ${JSON.stringify(req.body)}`)

        let packageLocation = {}
        for (const packageName in req.body) {
            packageLocation = req.body[packageName];
            const package = await Package.findOne({ where: { code: packageName }, include: [
                {
                  model: Batch,
                  where: { AdminId: req.header['id'] },
                }] });
            await package.update(packageLocation)
        }
        res.json({"created_location":true});
    }
    catch (error){
        res.json({"error":error});
    }
}



module.exports = {listPackages, createPackage, getPackage, updatePackage, deletePackage, setLocation};