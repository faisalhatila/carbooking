const Sequelize = require("sequelize");
const db = require("../config/db.config");
const Category = db.sequelize.define("category", {
  title: {
    type: Sequelize.STRING,
  },
  isActive: {
    type: Sequelize.STRING,
  },
  isDeleted: {
    type: Sequelize.STRING,
  },
});

Category.sync().then(() => {
  console.log("table created");
});

module.exports = Category;
