const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ProductImage', productImageSchema);
