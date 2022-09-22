import nodemailer from "nodemailer";

export default {
  SEND: async function (req, res, next) {
    try {
      const { gmail } = req.body;
      let transporter = nodemailer.createTransport({
        service: "mail.ru",
        auth: {
          user: "nodir.bek.2023@mail.ru",
          pass: "2Q8MpwfU14bzj9wxa4zk",
        },
      });

      const code =
        parseInt(Math.random() * 1000) +
        gmail[parseInt(Math.random() * gmail.length)] +
        parseInt(Math.random() * 1000) +
        gmail[parseInt(Math.random() * gmail.length)];

      const mailOptions = {
        from: "nodir.bek.2023@mail.ru",
        to: gmail,
        subject: "CODE",
        text: code,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) throw new Error(err.message);
        else {
          req.body.password = code;
          return next();
        }
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
};
