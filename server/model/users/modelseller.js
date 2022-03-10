const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  users: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  businessName: { type: String, default: null },
  pic: { type: String, default: 'avatar.png' },
  abnNumber: { type: Number },

  accountNumber: { type: String },
  isEnable: { type: String, default: 'yes' },
  counterId: { type: Number },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model('seller', userSchema);
