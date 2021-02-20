const { success, failed } = require("../../config/response");
const { compareSync } = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { users } = require("../../models");
const { sign } = require("jsonwebtoken");

exports.login = async ({ body: { email, password } }, res) => {
  try {
    const user = await users.findOne({ where: { email } });
    const validUser = compareSync(password, user.password);
    if (!user || !validUser)
      return res.json(failed({ message: "email and password tidak cocok" }));

    return res.json(
      success({
        message: "welcome to our system",
        data: responseWithToken(user),
      })
    );
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};

const responseWithToken = (user) => {
  delete user.dataValues.password;
  const response = {
    ...user.dataValues,
    token: sign({ user }, "shiftacademy", {
      expiresIn: "1h",
    }),
  };
  return response;
};
exports.loginValidation = [
  body("email", "email tidak boleh kosong")
    .notEmpty()
    .isEmail()
    .withMessage("Gunakan email yang valid"),
  body("password", "jenis kelamin tidak boleh kosong"),
];
