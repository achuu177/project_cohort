const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  wishlist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist',
    required: true,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
