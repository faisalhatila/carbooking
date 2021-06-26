const Sequelize = require("sequelize");
const db = require("../config/db.config");
const User = db.sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.sync().then(() => {
  console.log("table created");
});

module.exports = User;
