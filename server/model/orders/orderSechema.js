const mongoose = require('mongoose');

const OrderSechema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  ///// productId: { type: mongoose.Schema.Types.ObjectId, ref: 'deals' },

  orderStatus: { type: String, default: 'pending' },

  address: { type: String },
  contactNo: { type: String },

  TotalPrice: { type: Number },
  dateGenerated: { type: Date },

  productDetail: { type: Array },
  counterId: { type: Number },
});

module.exports = mongoose.model('orders', OrderSechema);
