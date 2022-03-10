const EmailVerifySchema = require('../../model/email/emailVerify');
const ObjectId = require('mongodb').ObjectID;
const Follow = require('../../model/follow/followSchema');
const { ThanksEmailBody } = require('../../services/Emails_Templetes/thanks');
const { sendEmail } = require('../../services/mailJetEmail');
var path = require('path');

module.exports = function (router) {
  router.get('/getFollower/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      let Fetch = await Follow.aggregate([
        {
          $match: {
            goestoId: ObjectId(userId),
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'goestoId',
            foreignField: '_id',
            as: 'user',
          },
        },
      ]);
      console.log(Fetch);
      return res.status(200).json(Fetch);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });

  router.get('/getFollowing/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      let Fetch = await Follow.aggregate([
        {
          $match: {
            uploderId: ObjectId(userId),
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'uploderId',
            foreignField: '_id',
            as: 'user',
          },
        },
      ]);
      console.log(Fetch);
      return res.status(200).json(Fetch);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });

  router.post('/followuser', async (req, res) => {
    const { uploderId, goestoId } = req.body;
    try {
      const checkfollow = await Follow.findOne({
        $and: [
          { uploderId: ObjectId(uploderId) },
          { goestoId: ObjectId(goestoId) },
        ],
      });

      console.log(checkfollow);
      if (checkfollow == null) {
        const followUser = await Follow.create({
          uploderId: ObjectId(uploderId),
          goestoId: ObjectId(goestoId),
        });

        return res.status(200).json('Succfully Follow');
      } else {
        return res.status(400).json({ message: 'Follow Already Exist' });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });
};
