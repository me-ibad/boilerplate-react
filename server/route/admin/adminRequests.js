const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../model/users/newUser');
const Seller = require('../../model/users/modelseller');
const SellerRequest = require('../../model/sellerRequest/sellerRequestModel');
const { sendEmail } = require('../../services/mailJetEmail');

const { ObjectId } = require('mongodb');
const auth = require('../../middleware/auth');
module.exports = function (router) {
  router.get('/fetchbusinessrequest', async (req, res) => {
    try {
      const Fetch = await SellerRequest.find().sort({ _id: -1 });

      return res.status(200).json(Fetch);
    } catch (err) {
      console.log(err);

      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });

  router.post('/sellerRequest', async (req, res) => {
    try {
      const user = await SellerRequest.findOne({
        users: ObjectId(req.body.userId),
      });

      if (user) {
        return res
          .status(400)
          .json({ message: 'Request Already exist. Please wait' });
      } else {
        const lastRecord = await SellerRequest.findOne()
          .sort({ _id: -1 })
          .limit(1);

        let counterId;

        if (lastRecord == null) {
          counterId = process.env.BUSINESS_Counter;
          ////  console.log(process.env.MONGO_Counter);
        } else {
          /////console.log(lastRecord.counterId);

          counterId = lastRecord.counterId + 1;
        }

        req.body.counterId = counterId;
        req.body.users = ObjectId(req.body.userId);

        const seller = await SellerRequest.create(req.body);
        console.log('done');
        return res.status(201).json({
          message: 'Requiest Submitted',
        });
      }

      // user
    } catch (err) {
      console.log(err);

      return res.status(400).json({ message: 'something Went Wrong' });
    }
    // Our register logic ends here
  });

  router.post('/confirmbusiness', async (req, res) => {
    console.log(req.body);

    try {
      const user = await SellerRequest.findOne({
        _id: ObjectId(req.body.requestId),
      });

      if (user) {
        const isSellerExist = await Seller.findOne({
          users: ObjectId(user.users),
        });

        if (isSellerExist == null) {
          console.log(user);

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
            businessName: user.businessName,
            abnNumber: counterId,
            users: ObjectId(user.users),
            counterId: counterId,
          });
          console.log('done');

          const filter = { _id: ObjectId(req.body.requestId) };
          const update = { status: 'accepted' };

          // `doc` is the document _before_ `update` was applied
          let doc = await SellerRequest.findOneAndUpdate(filter, update);

          console.log(doc);

          let customer = await User.findOne({
            _id: ObjectId(user.users),
          });

          console.log('-----------------');
          console.log(customer.email);

          let emailToSend = [
            {
              Email: customer.email,
            },
          ];

          let dataToSend = {
            seller: seller,
            customer: customer,
          };

          sendEmail(
            emailToSend,
            'Latestlocaldealz Small Business Approval',
            dataToSend,
            'seller_Request'
          );
          return res.status(201).json({
            message: 'Updated Success',
          });
        } else {
          return res.status(400).json({ message: 'seller already approved' });
        }
      }
    } catch (err) {
      console.log(err);

      return res.status(400).json({ message: 'something Went Wrong' });
    }
  });
};
