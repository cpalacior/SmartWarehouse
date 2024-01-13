const express = require('express');
const router = express.Router(); 
const UsageRouter = require('../controllers/UsageController');

router
    .get('/totalusage',UsageRouter.getTotalUsage)
    

module.exports = router;