module.exports = function (app) {
  var router = require("express").Router();
  const path = require("path");
  const multer = require("multer");
  const checkAuthMiddleware = require("../../middlewares/check-auth");
  const storage = multer.diskStorage({
    destination: "./cars",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  const upload = multer({
    storage: storage,
  });

  const car = require("../controllers/car.controller");

  app.post(
    "/api/car",
    checkAuthMiddleware.checkAuth,
    upload.single("carImage"),
    car.save
  );

  app.get("/api/car", car.findAll);

  app.get("/api/car/:id", car.findOne);

  app.put("/api/car/:id", car.update);

  app.delete("/api/car/:id", car.delete);

  app.delete("/api/car/", car.deleteall);
};
