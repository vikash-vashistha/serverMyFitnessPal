require("dotenv").config();
const express = require("express");
const connect = require("./configs/db");
const { register, login } = require("./controllers/auth.controller");
const { body } = require("express-validator");
const passport = require("./configs/google-oauth");


const app = express();

app.use(express.json());

app.post("/register", body("email").notEmpty(), register);
app.post("/login", login);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    const { user } = req;
    const token = newToken(user);

    return res.send({ user, token });
  }
);

app.listen(process.env.PORT || 2345, async function () {
  try {
    await connect();
    console.log("app is listening on port 2345");
  } catch (err) {
    console.log(err.message);
  }
});
