const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  User.findOne({ where: { email: req.body?.email } })
    .then((result) => {
      if (result) {
        res.status(403).json({
          message: "Email already exist. Try another email",
        });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req?.body?.password, salt, (err, hash) => {
            const data = { ...req?.body, password: hash };
            User.create(data)
              .then((user) => {
                console.log({ user });
                res.status(201).json({
                  message: "User created successfully",
                  user: user,
                });
              })
              .catch((err) =>
                res.status(500).json({
                  message: "Something went wrong",
                  error: err,
                })
              );
          });
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      })
    );
};
exports.signIn = (req, res) => {
  User.findOne({ where: { email: req.body?.email } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({
          message: "Invalid credentials",
        });
      } else {
        bcrypt.compare(req?.body?.password, user?.password, (err, result) => {
          if (!!result) {
            const token = jwt.sign(
              {
                email: user?.email,
                userId: user?.id,
              },
              process.env.JWT_KEY,
              (err, token) => {
                res.status(200).json({
                  message: "Authentication successfull",
                  token: token,
                });
              }
            );
          } else {
            res.status(401).json({
              message: "Invalid credentials",
            });
          }
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      })
    );
};
