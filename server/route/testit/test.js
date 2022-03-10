var path = require('path');
const linkCheck = require('link-check');
const mailjet = require('node-mailjet').connect(
  'fcfcbbab5055ea1ec8f163796581b018',
  '8d26bfe7148f35f8254803675ad1bae1'
);
var isstart = false;
var counter = 0;
var interval;
const moment = require('moment-timezone');
const { Expo } = require('expo-server-sdk');

const expo = new Expo();

const moment1 = require('moment');

var request = require('request');

const handlePushTokens = (title, body, to) => {
  let notifications = [];

  notifications.push({
    to: to,
    sound: 'default',
    title: title,
    body: body,

    data: { body },
  });

  let chunks = expo.chunkPushNotifications(notifications);
  console.log(chunks);

  (async () => {
    for (let chunk of chunks) {
      console.log('11111111111111111111111111');
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);

        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
    notifications = [];
  })();
};

async function sendEmail(email) {
  console.log(email);
  var date = new Date();
  var dateformat = date.toLocaleString();

  var serbia = moment.tz(date, 'Europe/Belgrade');

  serbia = moment1(serbia).format('DD-MM-YYYY HH:mm:ss');

  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: 'ha15341@gmail.com',
          Name: 'Hasan',
        },
        To: [
          {
            Email: email,
          },
        ],
        Subject: 'Term... SRB',
        TextPart: ' Shpejtoni - tani eshte hapur !!!   :' + serbia,
        /////HTMLPart: Email_Templete_Name,
        CustomID: 'AppGettingStartedTest',
      },
    ],
  });

  let res = await request;
}
module.exports = function (router) {
  router.get('/servicestatus', async (req, res) => {
    if (isstart == true) {
      res.send('Your service in Start postion');
    } else {
      res.send('Your service in stop postion');
    }
  });

  router.post('/startservice', async (req, res) => {
    try {
      var date = new Date();
      var dateformat = date.toLocaleString();

      var serbia = moment.tz(date, 'Europe/Belgrade');

      serbia = moment1(serbia).format('DD-MM-YYYY HH:mm:ss');

      clearInterval(interval);
      console.log(req.body);
      isstart = true;
      var time = 1000 * req.body.time;
      var email = req.body.email;

      interval = setInterval(function () {
        request(req.body.url, function (error, response, body) {
          if (error) {
            console.error(error);
            return;
          }

          if (body.includes('categoryId=1253') == true) {
            handlePushTokens(
              'Term... SRB',
              'Shpejtoni - tani eshte hapur !!!   :' + serbia,
              'ExponentPushToken[0XJtReE7bufYpPAjCGK1N6]'
            );

            sendEmail(email);
          }
        });
      }, time);

      res.send('it start');
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });

  router.get('/stopservice', async (req, res) => {
    try {
      ////clearInterval(intervalObj);

      //// if (interval._repeat) {
      console.log('stop');
      clearInterval(interval);
      ///  }
      isstart = false;
      res.send('it stop');
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });
};
