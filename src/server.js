import sha256 from "sha256";
import express from "express";
import Userrouter from "../router/users.js";
import AuthRouter from "../router/auth.js";
const app = new express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/user", Userrouter);

app.listen(PORT, () => console.log("Server run http://localhost:" + PORT));
