import { fetch } from "../utils/pg.js";
import jwt from "jsonwebtoken";
import sha256 from "sha256";
import {
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "../middlewares/userModel.js";

export default {
  GET: async function (req, res) {
    try {
      let userId = req.userId;
      let users = await fetch(getUser + " where id = " + userId);
      if (!users.length) {
        return res.json({
          status: 400,
          message: userId + " - user not found",
          data: [],
        });
      }
      res.json({
        status: 200,
        message: (userId ? userId : users.length) + " - user",
        data: userId ? users[0] : users,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
  POST: async function (req, res) {
    try {
      let {
        username,
        gmail = "alim@mal.com",
        password = "aaa111",
        contact = "94" + parseInt(Math.random() * 10000000),
      } = req.body;
      let [postuser] = await fetch(
        postUser,
        username,
        gmail,
        sha256(password),
        contact
      );
      res.json({
        status: 200,
        message: "Add new user!",
        data: {
          token: jwt.sign(
            { userId: postuser.id, agent: req["headers"]["user-agent"] },
            "KEYCODE"
          ),
        },
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
  PUT: async function (req, res) {
    try {
      console.log(req.body);
      let { username, gmail, password, contact } = req.body;
      let id = req.userId;

      if (!id && !gmail) {
        return res.json({
          status: 402,
          message: "You must send 'id' or 'gmail'!",
          data: [],
        });
      }
      if (!username && !gmail && !password && !contact) {
        return res.json({
          status: 402,
          message:
            "You must send sameone data is 'username', 'gmail', 'password' , 'contact' or ''",
          data: [],
        });
      }
      let [user] = await fetch(
        getUser + (id ? " where id = " + id : ` where gmail = '${gmail}'`)
      );
      if (!user) {
        return res.json({
          status: 400,
          message: id || gmail + " - user not found",
          data: [],
        });
      }
      let [putuser] = await fetch(
        putUser,
        id ?? user.id,
        username ?? user.username,
        gmail ?? user.gmail,
        password ? sha256(password) : user.password,
        contact ?? user.contact
      );
      res.json({
        status: 200,
        message: user.id + " - update user!",
        data: {
          token: jwt.sign(
            { userId: putuser.id, agent: req["headers"]["user-agent"] },
            "KEYCODE"
          ),
          code: req.body.password,
        },
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: [],
      });
    }
  },
  DELETE: async function (req, res) {
    let id = req.userId;
    if (!id) {
      return res.json({
        status: 402,
        message: "You must send 'id'",
        data: [],
      });
    }
    let [deleteuser] = await fetch(deleteUser, id);
    return res.json({
      status: 200,
      message: id + " - delete user",
      data: deleteuser,
    });
  },
};
