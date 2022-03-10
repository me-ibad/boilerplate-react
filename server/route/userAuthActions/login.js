const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../model/users/newUser');

const auth = require('../../middleware/auth');
module.exports = function (router) {
  router.post('/login', async (req, res) => {
    console.log(req.body);
    // Our login logic starts here
    try {
      // Get user input
      const { username, pass } = req.body;

      // Validate user input
      if (!(username && pass)) {
        return res.status(400).json({ message: 'All input is required' });
      }
      // Validate if user exist in our database
      const user = await User.findOne({
        $or: [
          {
            email: username,
          },
          {
            username: username,
          },
        ],
      });

      if (user && (await bcrypt.compare(pass, user.pass))) {
        if (user.verify == 'no') {
          return res
            .status(400)
            .json({ message: 'Please Verify your account. Check your Email' });
        }

        // Create token
        const token = jwt.sign(
          { user_id: user._id, username },
          process.env.TOKEN_KEY,
          {
            expiresIn: '7d',
          }
        );

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: 'invalid crendtial' });
      }
    } catch (err) {
      console.log(err);

      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
    // Our register logic ends here
  });

  router.post('/welcome', auth, (req, res) => {
    res.json('Welcome 🙌 ');
  });
};
