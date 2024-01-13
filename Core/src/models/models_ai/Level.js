const mongoose = require('mongoose');

// Definición del esquema de la colección "levels"
const LevelSchema = new mongoose.Schema({
  code: {
    type: mongoose.SchemaTypes.String,
  },
  max_weight: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  height: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
});

// Creación del modelo "Level" a partir del esquema
module.exports = mongoose.model('Level', LevelSchema);
