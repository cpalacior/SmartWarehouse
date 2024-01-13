const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.Number,
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  code: {
    type: mongoose.SchemaTypes.String,
  },
  capacity: {
    type: mongoose.SchemaTypes.Number,
  },
  dimensions: {
    type: mongoose.SchemaTypes.Number,
  },
  width: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  depth: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  num_of_slots: {
    type: mongoose.SchemaTypes.Number,
  },
  distance_to_door: {
    type: mongoose.SchemaTypes.Number,
  },
});

// Creación del modelo "Section" a partir del esquema
module.exports = mongoose.model('section', SectionSchema);

