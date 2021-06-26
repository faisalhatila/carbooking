// const db = require("../models");
// // const Car = db.car;
// const Car = require("../models/car.model");
// const Op = db.Sequelize.Op;
// exports.save = (req, res) => {
//   console.log({ req: JSON.stringify(req.body) });
//   console.log({ res: res.body });
//   // Validate request
//   if (!req?.body?.title) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//     return;
//   }

//   // Create a Car
//   const car = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false,
//   };

//   // Save Car in the database
//   Car.create(car)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while creating the Car.",
//       });
//     });
// };
// exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

//   Car.findAll({ where: condition })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving cars.",
//       });
//     });
// };
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Car.findByPk(id)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving Car with id=" + id,
//       });
//     });
// };
// exports.update = (req, res) => {
//   const id = req.params.id;

//   Car.update(req.body, {
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Car was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Car with id=" + id,
//       });
//     });
// };
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Car.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Car was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Car with id=" + id,
//       });
//     });
// };
// exports.deleteAll = (req, res) => {
//   Car.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} Car were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while removing all cars.",
//       });
//     });
// };
// exports.findAllPublished = (req, res) => {
//   Car.findAll({ where: { published: true } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving cars.",
//       });
//     });
// };
const db = require("../config/db.config.js");
const Car = require("../models/car.model");
const Op = db.Sequelize.Op;

// Save FormData - Car to MySQL
exports.save = (req, res) => {
  // console.log("Post a Car: " + JSON.stringify(req.body));
  console.log("Post a Car: " + req.file.filename);
  var data = {
    ...req.body,
    carImage: req.file.filename,
    category: req?.body?.category,
  };
  // var data = req.body;
  Car.create(data)
    .then((car) => {
      res.status(201).json({
        message: "Car added successfully",
        car,
      });
    })
    .catch((err) => res.send(err));
};

// Fetch all Cars
exports.findAll = (req, res) => {
  console.log("Get All Cars", { req: req.headers });
  Car.findAndCountAll({
    limit: 10,
    offset: 0,
    attributes: ["id", "title", "description", "published"],
    // where: { title: { [Op.like]: `%Car%` } },
  }).then((Cars) => {
    console.log("Logging cars", { Cars: Cars.rows[0] });
    const count = Cars.length;
    res.send(Cars);
  });
};

// exports.findAndCountAll = (req,res) => {

// }

// Fetch all Cars
exports.findOne = (req, res) => {
  console.log("Get one Cars", { req: req.params });
  Car.findByPk(req.params.id).then((Car) => res.json({ code: 200, data: Car }));
};

exports.update = (req, res) => {
  console.log("Get one Cars");
  Car.update(
    {
      name: req.body.name,
      address: req.body.address,
      contact: req.body.contact,
    },

    {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    }
  ).then((Car) => res.json({ code: 200, msg: "data updated", data: Car }));
};

exports.delete = (req, res) => {
  console.log("Get one Cars");
  Car.destroy({ where: { id: req.params.id } }).then((Car) =>
    res.send({ code: 200, msg: "Deleted" })
  );
};

exports.deleteall = (req, res) => {
  console.log("delete all");
  Car.destroy({ where: {}, truncate: true }).then((Car) =>
    res.send({ code: 200, msg: "Delete all" })
  );
};
