const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: "0",
  pool: {
    // max: dbConfig.pool.max,
    max: 5,
    // min: dbConfig.pool.min,
    min: 0,
    // acquire: dbConfig.pool.acquire,
    acquire: 30000,
    // idle: dbConfig.pool.idle,
    idle: 10000,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.car = require("./car.model")(sequelize, Sequelize);
module.exports = db;
