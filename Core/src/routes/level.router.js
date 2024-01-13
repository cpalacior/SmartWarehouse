const express = require('express');
const router = express.Router(); 
const LevelController = require('../controllers/LevelController');

router
    .get('/list',LevelController.listLevels)
    .get('/get/:id',LevelController.getLevel)
    .post('/delete/:id',LevelController.deleteLevel)
    .post('/create',LevelController.createLevel)
    .post('/update/:id',LevelController.updateLevel);

module.exports = router;