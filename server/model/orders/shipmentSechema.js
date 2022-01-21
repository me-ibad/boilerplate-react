const mongoose = require('mongoose');

const shipmentSechema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'orders' },

  AccountNo: { type: String },
  AccountName: { type: String },

  contactNo: { type: String },
  trackingNo: { type: String },
  BSB: { type: String },
  courierName: { type: String },
  courierWeb: { type: String },
});

module.exports = mongoose.model('shipmentDetails', shipmentSechema);
