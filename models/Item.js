const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
