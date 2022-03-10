const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getCurrentDate = require("../../services/getCurrentDate");

const User = require("../../model/users/newUser");
const { sendEmail } = require("../../services/mailJetEmail");
const Seller = require("../../model/users/modelseller");

const { ObjectId } = require("mongodb");
const Order = require("../../model/orders/orderSechema");

const Deals = require("../../model/deals/dealDetail");

const stripe = require("stripe")(process.env.Secret_key);
const auth = require("../../middleware/auth");

async function updateUser(userData, last4) {
  let doc = await User.findOneAndUpdate(
    { _id: ObjectId(userData._id) },
    { cardInfo: last4 }
  );
}

async function addOrder(
  userData,
  orderDetail,
  totalAmount,
  address,
  contactNo
) {
  try {
    console.log("-------------------new order-----------");
    for (let i = 0; i < orderDetail.products.length; i++) {
      ////  productId

      const deal = await Deals.findOne({
        _id: ObjectId(orderDetail.products[i].productId),
      });

      let newStock =
        deal.amount == 0 ? 0 : deal.amount - orderDetail.products[i].quantity;

      const filter = { _id: ObjectId(orderDetail.products[i].productId) };
      const update = { amount: newStock };

      // `doc` is the document _before_ `update` was applied
      let doc = await Deals.findOneAndUpdate(filter, update);
      /////console.log(doc);
    }

    let data = {
      shopId: ObjectId(orderDetail.shopId),
      address: address,
      contactNo: contactNo,
      customerId: ObjectId(userData._id),
      TotalPrice: totalAmount,
      //////// dateGenerated: getCurrentDate.currentDate,
      productDetail: orderDetail,
    };

    const lastRecord = await Order.findOne().sort({ _id: -1 }).limit(1);

    if (lastRecord == null) {
      data.counterId = process.env.MONGO_Counter;
    } else {
      data.counterId = lastRecord.counterId + 1;
    }

    const order = await Order.create(data);

    let customer = await User.findOne({
      _id: ObjectId(order.customerId),
    });

    let Sellerdetail = await User.findOne({
      _id: ObjectId(order.shopId),
    });

    let SellerBusiness = await Seller.findOne({
      users: ObjectId(order.shopId),
    });

    //////console.log(order.productDetail[0].products);

    let datatoSend = {
      customer: customer,
      Sellerdetail: Sellerdetail,
      SellerBusiness: SellerBusiness,
      order: order,
    };

    let emailToSend = [
      {
        Email: Sellerdetail.email,
      },
    ];

    let emailToSendCustomer = [
      {
        Email: customer.email,
      },
    ];

    sendEmail(emailToSend, "You Have a New Order!!!", datatoSend, "new_order");

    sendEmail(
      emailToSendCustomer,
      "Thank you for your order",
      datatoSend,
      "thanks_order"
    );
    return true;
  } catch (err) {
    ///console.log('$54----------------  errrrrr-------------------------');

    console.log(err);
  }
}

async function checkCustomer(userId, userData, token, paymentMethod) {
  try {
    const customer = await stripe.customers.create({
      id: userId,
      //////source: token.token.id,
      ////// address: userData.address,
      description: "Just Add customer",
      email: userData.email,
      invoice_settings: {
        default_payment_method: paymentMethod.id,
      },
      payment_method: paymentMethod.id,
      name: userData.fname + "  " + userData.lname,
      next_invoice_sequence: 1,
      phone: userData.contactNo,
    });

    ///// console.log('$54----------------  customerwe-------------------------');

    //// console.log(customer);

    return customer;
  } catch (err) {
    ///console.log('$54----------------  errrrrr-------------------------');

    console.log(err);
  }
}

module.exports = function (router) {
  router.get("/isOldOrNewCustomer/:userId", async (req, res) => {
    console.log(req.params);
    try {
      stripe.customers.retrieve(
        req.params.userId,
        async function (err, customer) {
          if (err) {
            console.log("err: " + err);
            ////  return res.status(400).json({ message: 'something Went Wrong' });
          }
          if (customer) {
            /// console.log(customer);
            //// console.log('success: ' + JSON.stringify(customer, null, 2));
            if (ObjectId.isValid(req.params.userId) == true) {
              console.log("-----------------------");
              let doc = await User.findOne({
                _id: ObjectId(req.params.userId),
              });
              console.log(doc);

              return res.status(200).json({
                message: "yes",
                data: doc.cardInfo,
              });
            } else {
              ///let doc = await User.findOne({ _id: ObjectId(req.params.userId) });
              /////  console.log(doc);

              return res.status(200).json({
                message: "yes",
                data: 67677,
              });
            }
          } else {
            return res.status(200).json({
              message: "no",

              data: "",
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "something Went Wrong" });
    }
  });

  router.post("/addCustomerCard", async (req, res) => {
    try {
      const {
        token,
        userData,
        paymentMethod,
        orderDetail,
        totalAmount,
        address,
        contactNo,
      } = req.body;

      var userId = userData._id;

      stripe.customers.create(
        {
          id: userId,
          //////source: token.token.id,
          ////// address: userData.address,
          description: "Just Add customer",
          email: userData.email,
          invoice_settings: {
            default_payment_method: paymentMethod.id,
          },
          payment_method: paymentMethod.id,
          name: userData.fname + "  " + userData.lname,
          next_invoice_sequence: 1,
          phone: userData.contactNo,
        },
        async function (err, customer) {
          if (err) {
            console.log("err: " + err);
          }
          if (customer) {
            updateUser(userData, req.body.paymentMethod.card.last4);
            console.log("customer created succcess");
            stripe.paymentIntents.create(
              {
                amount: Math.round(totalAmount * 100),
                currency: "AUD",
                payment_method:
                  customer.invoice_settings.default_payment_method,
                customer: userId,
              },
              async function (err, charge) {
                if (err) {
                  console.log("err: " + err);
                }
                if (charge) {
                  if (charge.status == "succeeded") {
                    addOrder(
                      userData,
                      orderDetail,
                      totalAmount,
                      address,
                      contactNo,
                      res
                    );
                    return res.status(200).json({
                      message: "Payemnt Has been done",
                      last4: req.body.paymentMethod.card.last4,
                    });
                  }
                  if (charge.status == "requires_confirmation") {
                    const paymentIntent = await stripe.paymentIntents.confirm(
                      charge.id,
                      {
                        payment_method:
                          customer.invoice_settings.default_payment_method,
                      }
                    );
                    if (paymentIntent.status == "succeeded") {
                      addOrder(
                        userData,
                        orderDetail,
                        totalAmount,
                        address,
                        contactNo,
                        res
                      );
                      return res.status(200).json({
                        message: "Payemnt Has been done",
                      });
                    } else {
                      return res
                        .status(400)
                        .json({ message: "something Went Wrong" });
                    }
                  } else {
                    console.log("Something wrong");
                  }
                }
              }
            );

            ////// console.log("success: "+JSON.stringify(card, null, 2));
          } else {
            return res.status(400).json({ message: "something Went Wrong" });
            console.log("Something wrong");
          }
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "something Went Wrong" });
    }
  });

  router.post("/pay", async (request, response) => {
    console.log(
      "---------------------------------------pay called----------------"
    );

    try {
      const {
        token,
        userData,
        paymentMethod,
        orderDetail,
        totalAmount,
        email,
        address,
        contactNo,
      } = request.body;

      var cusid = userData._id;

      let customer;
      let intent;
      if (request.body.payment_method_id) {
        try {
          customer = await stripe.customers.retrieve(cusid);
          console.log("old customer");
          /////  console.log(customer);
        } catch (error) {
          ///// console.error(error);
          console.log("new customer");
          customer = await stripe.customers.create({
            email: email,
            id: cusid,
            payment_method: request.body.payment_method_id,
            invoice_settings: {
              default_payment_method: request.body.payment_method_id,
            },
          });

          // expected output: ReferenceError: nonExistentFunction is not defined
          // Note - error messages will vary depending on browser
        }

        // Create the PaymentIntent
        intent = await stripe.paymentIntents.create({
          payment_method: request.body.payment_method_id,
          amount: totalAmount * 100,
          currency: "AUD",
          customer: customer.id,
          confirmation_method: "manual",
          confirm: true,
        });
      } else if (request.body.payment_intent_id) {
        console.log("confrom called");

        intent = await stripe.paymentIntents.confirm(
          request.body.payment_intent_id
        );
      }
      // Send the response to the client
      response.send(
        generateResponse(
          intent,
          userData,
          orderDetail,
          totalAmount,
          address,
          contactNo
        )
      );
    } catch (e) {
      // Display error on client
      return response.send({ error: e.message });
    }
  });

  const generateResponse = (
    intent,
    userData,
    orderDetail,
    totalAmount,
    address,
    contactNo
  ) => {
    // Note that if your API version is before 2019-02-11, 'requires_action'
    // appears as 'requires_source_action'.
    if (
      intent.status === "requires_action" &&
      intent.next_action.type === "use_stripe_sdk"
    ) {
      // Tell the client to handle the action
      return {
        requires_action: true,
        payment_intent_client_secret: intent.client_secret,
      };
    } else if (intent.status === "succeeded") {
      addOrder(userData, orderDetail, totalAmount, address, contactNo);
      console.log("payment done now fianlly");

      // The payment didn’t need any additional actions and completed!
      // Handle post-payment fulfillment
      return {
        success: true,
      };
    } else {
      // Invalid status
      return {
        error: "Invalid PaymentIntent status",
      };
    }
  };

  router.post("/makeChargeFromLastCard", async (req, res) => {
    try {
      const {
        userData,

        orderDetail,
        totalAmount,
        address,
        contactNo,
      } = req.body;

      var userId = userData._id;

      const checkCustomerAlreadyAvailabel = await stripe.customers.retrieve(
        userId
      );

      const intent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100),
        currency: "AUD",
        payment_method:
          checkCustomerAlreadyAvailabel.invoice_settings.default_payment_method,
        customer: userId,
      });
      if (intent.status == "succeeded") {
        addOrder(userData, orderDetail, totalAmount, address, contactNo, res);

        return res.status(200).json({
          message: "Payemnt Has been done",
        });
      }
      if (intent.status == "requires_confirmation") {
        const paymentIntent = await stripe.paymentIntents.confirm(intent.id, {
          payment_method:
            checkCustomerAlreadyAvailabel.invoice_settings
              .default_payment_method,
        });
        if (paymentIntent.status == "succeeded") {
          addOrder(userData, orderDetail, totalAmount, address, contactNo, res);

          return res.status(200).json({
            message: "Payemnt Has been done",
          });
        } else {
          return res.status(400).json({ message: "something Went Wrong" });
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "something Went Wrong" });
    }
  });
};
