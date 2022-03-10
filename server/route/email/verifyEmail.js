const EmailVerifySchema = require('../../model/email/emailVerify');
const ObjectId = require('mongodb').ObjectID;
const User = require('../../model/users/newUser');
const { ThanksEmailBody } = require('../../services/Emails_Templetes/thanks');
const { sendEmail } = require('../../services/mailJetEmail');
var path = require('path');

module.exports = function (router) {
  router.get('/verify/email/:email/uniqueid/:uniqueId', async (req, res) => {
    const { email, uniqueId } = req.params;

    try {
      const Record_Exist = await EmailVerifySchema.findOne({
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
        const filter = { email: email };
        const update = { verify: 'yes' };

        let doc = await User.findOneAndUpdate(filter, update);
        console.log(doc);

        var emailParameters = {
          email,
          fname: doc.fname,
        };

        let emailToSend = [
          {
            Email: email,
          },
        ];

        sendEmail(
          emailToSend,
          'Welcome to Latestlocaldealz.com.au',
          emailParameters,
          'Welcome_Email_Body'
        );
        res.send(ThanksEmailBody);
      } else {
        res.send('no record found ');
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });
};
