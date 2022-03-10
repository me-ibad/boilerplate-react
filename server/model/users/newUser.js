const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fname: { type: String, default: null },
  lname: { type: String, default: null },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  pic: { type: String, default: 'avatar.png' },

  address: { type: String, default: null },
  cardInfo: { type: String, default: null },
  contactNo: { type: String, default: null },

  isEnable: { type: String, default: 'yes' },

  Roles: { type: Array, default: ['user'] },

  pass: { type: String },
  token: { type: String },
  following: { type: Number },
  follower: { type: Number },
  expotoken: { type: String, default: null },
  verify: { type: String, default: 'no' },
  counterId: { type: Number },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Users', userSchema);
