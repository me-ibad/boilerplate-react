// const WolframAlphaAPI = require('wolfram-alpha-api');
// const waApi = WolframAlphaAPI('UX77RX-H8TT7UWETJ');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
module.exports = function (router) {
  async function sendOnlyText(text, res) {
    const twiml = new MessagingResponse();

    twiml.message(text);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }

  async function sendWithImage(text, image, res) {
    const twiml = new MessagingResponse();

    const message = twiml.message();
    message.body(text);
    message.media(image);

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  }

  router.post('/recieveSMS', async (req, res) => {
    try {
      var image = '';
      var Wikipedia = '';
      var finalresult = '';

      var finalMessage = '';

      let result = await waApi.getFull({
        input: req.body.Body,
        output: 'json',
      });

      for (let i = 0; i < result.pods.length; i++) {
        if (
          result.pods[i].title == 'Images' ||
          result.pods[i].title == 'Image'
        ) {
          image = result.pods[i].subpods[0].img.src;
        }

        if (result.pods[i].title == 'Wikipedia summary') {
          Wikipedia = result.pods[i].subpods[0].plaintext;
        }

        if (
          result.pods[i].title == 'Result' ||
          result.pods[i].title == 'Results'
        ) {
          finalresult = result.pods[i].subpods[0].plaintext;

          if (image == '' && Wikipedia == '') {
            image = result.pods[i].subpods[0].img.src;
          }
        }
      }

      if (finalresult != '') {
        finalMessage = finalresult;
      } else {
        finalMessage = Wikipedia;
      }

      console.log('----------final Message-----');
      console.log(finalMessage);
      console.log('-----------image-----');
      console.log(image);

      if (image != '') {
        sendWithImage(finalMessage.substring(0, 159), image, res);
      } else {
        sendOnlyText(finalMessage.substring(0, 159), res);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'somrthing Went Wrong' });
    }
  });
};
