const express = require('express');
const router = express.Router(); 
const warehouseController = require('../controllers/WarehouseController');
const verifyToken = require('../middleware/token_validator');

router
    .get('/list',warehouseController.listWarehouse)
    .get('/get/:id',warehouseController.getWarehouse)
    .post('/create',warehouseController.createWarehouse)
    .post('/update/:id',warehouseController.updateWarehouse)
    .post('/delete/:id',warehouseController.deleteWarehouse);

module.exports = router;