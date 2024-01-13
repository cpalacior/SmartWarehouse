const express = require('express'); 

const adminRouter = require('./admin.router');
const warehouseRouter = require('./warehouse.router');
const batchRouter = require('./batch.router');
const packageRouter = require('./package.router');
const sectionRouter = require('./section.router')
const levelRouter = require('./level.router');
const slotRouter = require('./slot.router');
const productRouter = require('./product.router');
const notificationRouter = require('.//notification.router');
const usageRouter = require('./usage.router')
const verifyToken = require('../middleware/token_validator')

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); 
  router.use('/admin',adminRouter);
  router.use('/product', productRouter);
  router.use('/warehouse',warehouseRouter);
  router.use('/batch',verifyToken,batchRouter);
  router.use('/package',packageRouter);
  router.use('/level',levelRouter);
  router.use('/section',verifyToken,sectionRouter);
  router.use('/slot',verifyToken,slotRouter);
  router.use('/notification', verifyToken ,notificationRouter);
  router.use('/usage',verifyToken,usageRouter)

}

module.exports = routerApi;