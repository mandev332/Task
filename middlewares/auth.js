import jwt from "jsonwebtoken";
import sha256 from "sha256";
import { fetch } from "../utils/pg.js";
import { getUser } from "./userModel.js";

export default {
  CHECK: async function (req, res, next) {
    try {
      console.log("userId");
      const { userId, agent } = jwt.verify(req.headers.token, "KEYCODE");
      console.log(userId);
      if (req["headers"]["user-agent"] != agent)
        throw new Error("You use Fake Token! ");
      req.userId = userId;
      return next();
    } catch (err) {
      res.json({
        status: 401,
        message: err.message,
        data: [],
      });
    }
  },
  DATA: async function (req, res, next) {
    try {
      let { username, contact } = req.body;
      if (username.length > 30 || username.length < 3)
        throw new Error("Invalid 'username'. You send length > 3 and < 30!");
      if (!/^[39][0-9]{8}$/.test(contact))
        throw new Error("Invalid contact! You can use Uzb mobile number!");

      return next();
    } catch (err) {
      res.json({
        status: 404,
        message: err.message,
        data: [],
      });
    }
  },
  LOGIN: async function (req, res) {
    try {
      let { gmail, password } = req.body;
      if (!gmail) throw new Error("gmail is required!");
      let [user] = await fetch(getUser + ` where gmail = $1`, gmail);
      if (!user) throw new Error("Unauthorized user!");
      if (user.password != sha256(password))
        throw new Error("Invalid password! Are you forgot your password?");
      res.json({
        status: 200,
        message: "Succesffuly",
        data: {
          token: jwt.sign(
            { userId: user.user_id, agent: req["headers"]["user-agent"] },
            "KEYCODE"
          ),
        },
      });
    } catch (err) {
      res.json({
        status: 401,
        message: err.message,
        data: [],
      });
    }
  },
  REGISTER: async function (req, res, next) {
    try {
      checkData(req.body);
      return next();
    } catch (err) {
      res.json({
        status: 404,
        message: err.message,
        data: [],
      });
    }
  },
};

function checkData(obj) {
  let { username, gmail, password } = obj;
  if (!username || !gmail || !password)
    throw new Error("You must send 'username', 'gmail' and  'password' ");
  if (username.length > 30 || username.length < 3)
    throw new Error("Invalid 'username'. You send length > 3 and < 30!");
  if (password.length < 4 || password.length > 10)
    throw new Error("Invalid password! You must input in length > 4 and < 10!");
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))
    throw new Error("Invalid password! You must input in letter and number!");
}
