import nodemailer from "nodemailer";
let transporter = nodemailer.createTransport({
  service: "mail.ru",
  auth: {
    user: "nodir.bek.2023@mail.ru",
    pass: "2Q8MpwfU14bzj9wxa4zk",
  },
});
const mailOptions = {
  from: "nodir.bek.2023@mail.ru",
  to: "nodirbekqobilov332@gmail.com",
  subject: "Test",
  text: "test qilish",
};
transporter.sendMail(mailOptions, function (err, info) {
  if (err) console.log(err);
  else console.log(info);
});
