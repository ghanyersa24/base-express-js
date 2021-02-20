const { success, failed } = require("../../config/response");
const { users } = require("../../models");

exports.profile = async ({ auth }, res) => {
  try {
    const req = await users.findOne({ where: { id: auth.user.id } });
    return res.json(success({ data: req }));
  } catch (error) {
    return res.json(failed({ message: "invalid data user", data: error }));
  }
};
