require("dotenv").config();
const express = require("express");
const connect = require("./configs/db");
const { register, login, newToken } = require("./controllers/auth.controller");
const { body } = require("express-validator");
const passport = require("./configs/google-oauth");
const Cors = require("cors")

const app = express();

///--sagar change----//
const allappController = require("./controllers/allapp.controller");
app.use(Cors());
app.use("/allapps", allappController);

//------------------------//-------------
app.use(express.json());

app.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("age")
    .isNumeric()
    .custom((value) => {
      if (value > 100 || value < 1) {
        throw new Error("age is not valid");
      }
      return true;
    }),
  body("gender").custom((value) => {
    if (value == "Male" || value == "Female" || value == "Others") {
      return true;
    }
    throw new Error("gender is not valid");
  }),
  register
);
app.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  login
);

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
