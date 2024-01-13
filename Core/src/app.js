const express = require('express');
require('./database/conectionMongo');
require('./libs/sequelize')
const cors = require('cors')


const app = express();
app.use(cors())
const routerApi = require('./routes');

app.use(express.json());
app.use(express.urlencoded());

routerApi(app);

module.exports = app;