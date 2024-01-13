const { Warehouse } = require('../models/models_core/Warehouse');
const { Package } = require('../models/models_core/Package');
const { Admin } = require('../models/models_core/Admin')
const { Batch } = require('../models//models_core/Batch')
const utils = require('../utils/functions')



const getTotalUsage = async (req, res) => {
    try {
      const admin = await Admin.findByPk(req.header['id']);
      const warehouse = await Warehouse.findByPk(admin.WarehouseId);
      const wareHouseSize = warehouse.size;
  
      const batches = await Batch.findAll({
        where: { AdminId: req.header['id'] },
        include: [Package],
      });
  
      let usageSize = 0;
  
      for (const batch of batches) {
        for (const package of batch.Packages) {
          usageSize += package.height * package.width * package.depth;
        }
      }
  
      const totalUsage = wareHouseSize - usageSize;
  
      res.json({ 
        totalUsage: totalUsage,
        wareHouseSize: wareHouseSize
       });
       
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  };
  


module.exports = {getTotalUsage};