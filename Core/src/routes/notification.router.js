const express = require('express');
const router = express.Router(); 
const NotificationController = require('../controllers/NotificationsController');

router
    .get('/list',NotificationController.listNotifications)
    .get('/get/:id',NotificationController.getNotification)
    .post('/delete/:id',NotificationController.deleteNotification)
    .post('/create',NotificationController.createNotification)
    .post('/update/:id',NotificationController.updateNotification);

module.exports = router;