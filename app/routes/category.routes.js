module.exports = function (app) {
  var router = require("express").Router();
  const checkAuthMiddleware = require("../../middlewares/check-auth");

  const category = require("../controllers/category.controller");

  app.post("/api/category", checkAuthMiddleware.checkAuth, category.save);

  app.get("/api/category", category.findAll);

  app.get("/api/category/:id", category.findOne);

  app.put("/api/category/:id", category.update);

  app.delete("/api/category/:id", category.delete);

  app.delete("/api/category/", category.deleteall);
};
