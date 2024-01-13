const mongoose = require('mongoose');

// Definición del esquema de la colección "batches"
const BatchSchema = new mongoose.Schema({
  code: {
    type: mongoose.SchemaTypes.String,
  },
  input_date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  weight: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  number_of_packages: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
});

// Creación del modelo "Batch" a partir del esquema
module.exports =  mongoose.model('batch', BatchSchema);
