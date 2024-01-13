const express = require('express');
const router = express.Router(); 
const BatchController = require('../controllers/BatchController');

router
    .get('/list',BatchController.listBatches)
    .get('/get/:id',BatchController.getBatch)
    .post('/delete/:id',BatchController.deleteBatch)
    .post('/create',BatchController.createBatch)
    .post('/update/:id',BatchController.updateBatch);

module.exports = router;