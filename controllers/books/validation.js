const { body, validationResult } = require("express-validator");
const { books, Sequelize } = require("../../models");
const { failed } = require("../../config/response");

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(404).json(failed({ message: errors.array()[0].msg }));
  next();
};

exports.postValidator = [
  body("name", "nama buku tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const book = await books.findOne({ where: { name: value } });
      if (book) {
        console.log(book);
        return Promise.reject("Nama buku telah digunakan");
      }
    }),
];

exports.putValidator = [
  body("name", "nama buku tidak boleh kosong")
    .notEmpty()
    .custom(async (value, { req }) => {
      const book = await books.findOne({
        where: { name: value, id: { [Sequelize.Op.ne]: req.body.id } },
      });
      if (book) return Promise.reject("Nama buku telah digunakan");
    }),
];
