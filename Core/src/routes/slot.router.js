const express = require('express');
const router = express.Router(); 
const SlotRouter = require('../controllers/SlotController');

router
    .get('/list',SlotRouter.listSlots)
    .get('/get/:id',SlotRouter.getSlot)
    .post('/delete/:id',SlotRouter.deleteSlot)
    .post('/create',SlotRouter.createSlot)
    .post('/update/:id',SlotRouter.updateSlot)
    .post('/createbulk',SlotRouter.creteSlotBulk);

module.exports = router;