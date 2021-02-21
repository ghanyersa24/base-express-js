const { success, failed } = require("../../config/response");
const { users } = require("../../models");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

exports.profile = async ({ auth }, res) => {
  try {
    const req = await users.findOne({ where: { id: auth.user.id } });
    return res.json(success({ data: req }));
  } catch (error) {
    return res.json(failed({ message: "invalid data user", data: error }));
  }
};

exports.updateProfile = async ({ auth, body }, res) => {
  const payload = {};
  if (body.name) payload.name = body.name;
  if (body.address) payload.address = body.address;
  if (body.phone) payload.phone = body.phone;
  if (body.gender) payload.gender = body.gender;
  if (body.password) {
    const user = await users.findOne({ where: { id: auth.user.id } });
    if (compareSync(body.password, user.password))
      return res.json(
        failed({ message: "password tidak boleh sama dengan yang lama" })
      );
    else {
      const salt = genSaltSync(10);
      payload.password = hashSync(body.password, salt);
    }
  }
  try {
    const req = await users.update(payload, { where: { id: auth.user.id } });
    return res.json(success({ message: "profile berhasil diubah" }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};
