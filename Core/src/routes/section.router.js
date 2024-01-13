const express = require('express');
const router = express.Router(); 
const SectionRouter = require('../controllers/SectionController');

router
    .get('/list',SectionRouter.listSections)
    .get('/get/:id',SectionRouter.getSection)
    .post('/delete/:id',SectionRouter.deleteSection)
    .post('/create',SectionRouter.createSection)
    .post('/update/:id',SectionRouter.updateSection);

module.exports = router;