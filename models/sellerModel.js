const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  business_name: {
    type: String,
    required: true,
  },
  business_email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = { Seller };
