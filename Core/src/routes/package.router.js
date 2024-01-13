const express = require('express');
const router = express.Router(); 
const PackageController = require('../controllers/PackageController');
const verifyToken = require('../middleware/token_validator')

router
    .get('/list',verifyToken,PackageController.listPackages)
    .get('/get/:id',verifyToken,PackageController.getPackage)
    .post('/delete/:id',verifyToken,PackageController.deletePackage)
    .post('/create',verifyToken,PackageController.createPackage)
    .post('/update/:id',verifyToken,PackageController.updatePackage)
    .post('/setlocation',verifyToken, PackageController.setLocation);

module.exports = router;