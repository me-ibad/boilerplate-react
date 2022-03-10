const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../model/users/newUser');
const forgetPass = require('../../model/email/forgetPass');
const upload = require('../../middleware/upload');
const auth = require('../../middleware/auth');
const ObjectId = require('mongodb').ObjectID;
module.exports = function (router) {
  router.post('/profilepicupdate', upload.array('pics'), async (req, res) => {
    try {
      console.log(req.files[0].key);

      const filter = { _id: ObjectId(req.body.userId) };
      const update = { pic: req.files[0].key };

      let doc = await User.findOneAndUpdate(filter, update);

      return res.json({
        data: req.files[0].key,
      });
    } catch (err) {
      console.log(err);

      return res.status(400).json({ message: 'something Went Wrong' });
    }
  });

  router.post('/updatepassword', async (req, res) => {
    console.log(req.body);
    // Our login logic starts here
    try {
      // Get user input
      const { email, pass, uniqueId } = req.body;

      // Validate user input
      if (!(email && pass)) {
        return res.status(400).json({ message: 'All input is required' });
      }
      // Validate if user exist in our database
      const user = await User.findOne({
        email,
      });

      if (user) {
        const Record_Exist = await forgetPass.findOne({
          $and: [
            {
              email: email,
            },
            {
              _id: ObjectId(uniqueId),
            },
          ],
        });

        if (Record_Exist) {
          encryptedpass = await bcrypt.hash(pass, 10);

          const filter = { email: email };
          const update = { pass: encryptedpass };

          let doc = await User.findOneAndUpdate(filter, update);

          return res
            .status(200)
            .json('Password Has been Updated.Now please Login');
        } else {
          return res
            .status(400)

            .json({
              message:
                'You are not Allowed to change Password. Check your Email',
            });
        }
      } else {
        return res.status(400).json({
          message: 'You are not Allowed to change Password. Check your Email',
        });
      }
    } catch (err) {
      console.log(err);

      return res.status(400).json({ message: 'something Went Wrong' });
    }
    // Our register logic ends here
  });
};
