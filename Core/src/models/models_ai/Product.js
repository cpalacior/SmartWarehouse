const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  code: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  batch: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  package: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  entry_date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  departure_date: {
    type: mongoose.SchemaTypes.Date,
    required: false,
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
  toploadable: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
  },
  category: {
    type: mongoose.SchemaTypes.String,
    enum: ['Agriculture', 'Building materials', 
            'Chemicals', 'Cleaning products', 
            'Electronics', 'Food', 'Fragile', 
            'Pet supplies', 'Pharmaceuticals', 
            'Textiles',],
    required: true,
  },
  perishable: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
  },
  expritation_date: {
    type: mongoose.SchemaTypes.Date,
    required: false,
  },
  section: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  slot: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  level: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
});

module.exports = mongoose.model('products', ProductSchema);