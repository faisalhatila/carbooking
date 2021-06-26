const Sequelize = require("sequelize");
const db = require("../config/db.config");
const Car = db.sequelize.define("car", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  published: {
    type: Sequelize.BOOLEAN,
  },
  carImage: {
    type: Sequelize.STRING,
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
  category: {
    type: Sequelize.INTEGER,
    required: true,
    allowNull: false,
  },
});

Car.sync().then(() => {
  console.log("table created");
});

module.exports = Car;
