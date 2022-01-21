const EmailVerifySchema = require('../../model/email/emailVerify');
const ObjectId = require('mongodb').ObjectID;
const User = require('../../model/users/newUser');

const forgetPass = require('../../model/email/forgetPass');

const { ThanksEmailBody } = require('../../services/Emails_Templetes/thanks');
const { sendEmail } = require('../../services/mailJetEmail');
var path = require('path');

module.exports = function (router) {
  router.post('/applyforgetpass', async (req, res) => {
    try {
      const { email } = req.body;

      ///// console.log(req.body)
      const user = await User.findOne({
        email,
      });

      if (user) {
        const passRecoed = await forgetPass.create({
          email: email.toLowerCase(),
        });

        let uniquelink =
          process.env.websiteLink +
          'updatepass/' +
          encodeURIComponent(email) +
          '/' +
          passRecoed._id;

        console.log(uniquelink);

        var emailParameters = {
          fname: user.fname,
          email,

          uniquelink: uniquelink,
        };

        let emailToSend = [
          {
            Email: email,
          },
        ];

        sendEmail(
          emailToSend,
          'Forget Password',
          emailParameters,
          'ForgetPass_Email_Body'
        );

        console.log(emailParameters);
        return res.status(200).json('Emial Has been sent');
      } else {
        return res.status(400).json({ message: 'No Such User Exist' });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });
};
