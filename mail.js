const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  // connect with the smtp
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'janiya67@ethereal.email',
        pass: '4wkaNEvK38R7vjkB3q'
    }
});

  let info = await transporter.sendMail({
    from: '"eeeeeeeeeee 👻" <janiya67@ethereal.email>', // sender address
    to: "syedmuzamil024@gmail.com", // list of receivers
    subject: "Hello Thapa", // Subject line
    text: "Hello YT Thapa", // plain text body
    html: "<b>Hello YT Thapa</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.json(info);
};

module.exports = sendMail;