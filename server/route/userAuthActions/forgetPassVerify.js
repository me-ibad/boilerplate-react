const forgetPass = require("../../model/email/forgetPass");
const ObjectId = require("mongodb").ObjectID;
const User = require("../../model/users/newUser");
const { ThanksEmailBody } = require("../../services/Emails_Templetes/thanks");
const { sendEmail } = require("../../services/mailJetEmail");
var path = require("path");

module.exports = function (router) {
  router.get("/forgetpassverify/uniqueid/:uniqueId", async (req, res) => {
    // res.statusCode = 302;
    // res.setHeader("Location", "http://www.url.com/page");
    // res.end();

    const { uniqueId } = req.params;

    console.log(req.params);

    try {
      const Record_Exist = await forgetPass.findOne({
        _id: ObjectId(uniqueId),
      });

      let email = Record_Exist.email;

      if (Record_Exist) {
        res.statusCode = 302;
        res.setHeader(
          "Location",
          "http://smarttravel.ml/updatepass/saeedartists@gmail.com/6123a41d5f24473d75894753"
        );
        res.end();
      } else {
        res.send("no record found ");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "somrthing Went Wrong" });
    }
  });
};
