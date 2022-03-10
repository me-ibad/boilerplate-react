const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/users/newUser");
const Seller = require("../../model/users/modelseller");
const { ObjectId } = require("mongodb");
const auth = require("../../middleware/auth");
module.exports = function (router) {
  router.get("/isSellerExist/:id", async (req, res) => {
    //// console.log(req.body);
    // Our login logic starts here
    try {
      // Get user input
      ///// const { id } = req.body;

      // Validate if user exist in our database
      const user = await Seller.findOne({
        users: ObjectId(req.params.id),
      });

      if (user) {
        res.status(200).json(user.businessName);
      } else {
        res.status(200).json("sellerNotExist");
      }

      // user
    } catch (err) {
      console.log(err);

      return res.status(400).json({ message: "somrthing Went Wrong" });
    }
    // Our register logic ends here
  });
};
