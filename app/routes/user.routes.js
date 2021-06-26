module.exports = function (app) {
  var router = require("express").Router();
  const user = require("../controllers/user.controller");

  app.post("/api/signup", user.signUp);
  app.post("/api/signin", user.signIn);

  // app.get("/api/car", car.findAll);

  // app.get("/api/car/:id", car.findOne);

  // app.put("/api/car/:id", car.update);

  // app.delete("/api/car/:id", car.delete);

  // app.delete("/api/car/", car.deleteall);
};
