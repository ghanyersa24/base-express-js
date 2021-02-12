const { body, validationResult } = require("express-validator");
const { users, Sequelize } = require("../../models");
const { failed } = require("../../config/response");

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json(failed({ message: errors.array()[0].msg }));
  }
  next();
};

const standard = [
  body("name", "nama tidak boleh kosong").notEmpty(),
  body("gender", "jenis kelamin tidak boleh kosong")
    .isIn(["M", "F"])
    .withMessage("jenis kelamin tidak sesuai"),
];

exports.postValidator = [
  ...standard,
  body("phone").custom(async (value) => {
    const user = await users.findOne({
      where: { phone: value },
    });
    if (user) {
      return Promise.reject("Nomor telepon sudah digunakan");
    }
  }),
];

exports.putValidator = [
  body("id", "id tidak boleh kosong")
    .notEmpty()
    .custom(async (value) => {
      const user = await users.findByPk(value);
      if (!user) return Promise.reject("User tidak ditemukan");
    }),
  ...standard,
  body("phone").custom(async (value, { req }) => {
    const user = await users.findOne({
      where: { phone: value, id: { [Sequelize.Op.ne]: req.body.id } },
    });
    if (user) {
      return Promise.reject("Nomor telepon sudah digunakan orang lain");
    }
  }),
];
