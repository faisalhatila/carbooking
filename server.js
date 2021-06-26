// const express = require("express");
// const cors = require("cors");
// const app = express();
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ urlencoded: false, extended: true }));
// app.use(bodyParser.json());
// const corsOptions = {

// require("./app/routes/car.routes")(app);
//   origin: "http://localhost:8081",
// };
// const db = require("./app/models");
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Rentwheels Server" });
// });
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server runnning on port ${PORT} `);
// });

//Essentials
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var dotenv = require("dotenv");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// app.use(express.static('resources'));

// global.__basedir = __dirname;

// const db = require("./app/config/db.config");

//force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
// });

require("./app/routes/car.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);

var port = process.env.port || 8080;

app.listen(port, () => {
  console.log("App listening at http://%s:%s", port);
});
