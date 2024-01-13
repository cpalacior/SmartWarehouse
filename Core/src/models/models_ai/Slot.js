const mongoose = require('mongoose');

// Definición del esquema de la colección "slots"
const SlotSchema = new mongoose.Schema({
  code: {
    type: mongoose.SchemaTypes.String,
  },
  height: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  width: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  depth: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  levels: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  distance_to_door: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  SectionId: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
});

// Creación del modelo "Slot" a partir del esquema
module.exports = mongoose.model('Slot', SlotSchema);
