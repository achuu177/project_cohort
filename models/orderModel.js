const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Verified', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  total_price: {
    type: Number,
    required: true,
  },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
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

module.exports = mongoose.model('Order', orderSchema);
