const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const User = require('../../model/users/newUser');
const Seller = require('../../model/users/modelseller');

const EmailVerifySchema = require('../../model/email/emailVerify');

const { sendEmail } = require('../../services/mailJetEmail');

module.exports = function (router) {
  router.post('/refreshToken', async (req, res) => {
    console.log(req.body);
    try {
      const { user_id, email } = req.body;

      const token = jwt.sign(
        { user_id: ObjectId(user_id), email },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_Time,
        }
      );
      console.log('------------------------------------');
      console.log('new token:' + token);

      return res.status(200).json(token);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'something Went Wrong' });
    }
  });

  router.post('/register', async (req, res) => {
    console.log(req.body);

    try {
      // Get user input
      const { fname, lname, email, pass, username } = req.body;

      // Validate user input
      if (!(email && pass && fname && lname)) {
        return res.status(400).json({ message: 'All input is required' });
      }

      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({
        $or: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      });

      if (oldUser) {
        return res
          .status(400)
          .json({ message: 'UserName or Email already Exist' });
      }

      //Encrypt user pass
      encryptedpass = await bcrypt.hash(pass, 10);

      // Create user in our database

      const lastRecord = await User.findOne().sort({ _id: -1 }).limit(1);

      let counterId;

      if (lastRecord == null) {
        counterId = process.env.MONGO_Counter;
        ////  console.log(process.env.MONGO_Counter);
      } else {
        /////console.log(lastRecord.counterId);

        counterId = lastRecord.counterId + 1;
      }

      const user = await User.create({
        fname,
        lname,
        email: email.toLowerCase(),
        username: username.toLowerCase(), // sanitize: convert email to lowercase
        pass: encryptedpass,
        counterId: counterId,
      });

      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_Time,
        }
      );
      // save user token
      user.token = token;

      const EmailVerify = await EmailVerifySchema.create({
        email: email.toLowerCase(),
      });

      var emailParameters = {
        fname,
        email,

        uniquelink:
          process.env.websiteLink +
          'api/verify/email/' +
          email +
          '/uniqueid/' +
          EmailVerify._id,
      };

      let emailToSend = [
        {
          Email: email,
        },
      ];

      ///// subject, data, emaile templete to select
      sendEmail(
        emailToSend,
        'Welcome to Latestlocaldealz.com.au',
        emailParameters,
        'veerify_Email_Body'
      );

      // return new user
      return res
        .status(201)
        .json('Verfication Email has been sent.Please Check your email ');
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });

  router.post('/updateuserinfo', async (req, res) => {
    try {
      // Get user input
      const { address, contactNo, id, fname, lname } = req.body;

      let update = {
        address: address,
        contactNo: contactNo,
        fname: fname,
        lname: lname,
      };
      let doc = await User.findOneAndUpdate({ _id: ObjectId(id) }, update);

      return res.status(201).json({
        fname: fname,
        lname: lname,
        address: address,
        contactNo: contactNo,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });

  router.post('/createseller', async (req, res) => {
    try {
      console.log(req.body);
      // Get user input
      const { businessName, abnNumber, id } = req.body;

      const lastRecord = await Seller.findOne().sort({ _id: -1 }).limit(1);

      let counterId;

      if (lastRecord == null) {
        counterId = process.env.MONGO_Counter;
        ////  console.log(process.env.MONGO_Counter);
      } else {
        /////console.log(lastRecord.counterId);

        counterId = lastRecord.counterId + 1;
      }

      const seller = await Seller.create({
        businessName: businessName,
        abnNumber: abnNumber,
        users: ObjectId(id),
        counterId: counterId,
      });
      console.log('done');
      return res.status(201).json({
        message: 'Updated Success',
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });
};
