const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/AdminController');
const verifyToken = require('../middleware/token_validator');
router
    .get('/list',adminController.listAdmins)
    .get('/get',verifyToken,adminController.getAdmin)
    .post('/delete',adminController.deleteAdmin)
    .post('/create',adminController.createAdmin)
    .post('/update',verifyToken,adminController.updateAdmin)
    .post('/authenticate',adminController.authenticate);

module.exports = router;