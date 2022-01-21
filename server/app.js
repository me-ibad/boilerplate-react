require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const router = express.Router();

const path = require('path');

const test = require('./route/testit/test');

const sms_engine = require('./route/testit/sms-engine');

const registeruser = require('./route/userAuthActions/registerNewUser');
const moment = require('moment-timezone');
const seller = require('./route/userAuthActions/seller');

const updatePass = require('./route/userAuthActions/updatePass');

const forgetPassVerify = require('./route/userAuthActions/forgetPassVerify');

const login = require('./route/userAuthActions/login');

const adminRequests = require('./route/admin/adminRequests');

const allPaymentRequest = require('./route/userAuthActions/allPaymentRequest');

const verifyEmail = require('./route/email/verifyEmail');
const uploaddeal = require('./route/deals/uploaddeal');

const followerRequest = require('./route/userAuthActions/followerRequest');

const applyforForgetPass = require('./route/email/applyforForgetPass');

const ordersRequest = require('./route/orders/ordersRequest');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH,GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/api', router);

registeruser(router);
login(router);
verifyEmail(router);
applyforForgetPass(router);
forgetPassVerify(router);
updatePass(router);
seller(router);
uploaddeal(router);
ordersRequest(router);
followerRequest(router);
adminRequests(router);
// test(router);
sms_engine(router);
allPaymentRequest(router);
app.use(express.static(path.join(__dirname, 'build')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

module.exports = app;
