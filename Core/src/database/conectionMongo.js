const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MongoDBUri)
    .then(() => console.log('conectado a Mongo')) // Comentar estas lineas cuando se vayan a hacer tests 
    .catch((err) => console.log(err));            //unitarios para evitar mensajes molestos.