const { success, failed } = require("../../config/response");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { users } = require("../../models");
exports.get = async (req, res) => {
  try {
    const data = await users.findAll();
    return res.json(success({ message: "data berhasil diterima", data: data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};
exports.create = async ({ body }, res) => {
  try {
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const payload = {
      name: body.name,
      email: body.email,
      password: body.password,
      address: body.address,
      gender: body.gender,
      phone: body.phone,
    };

    const data = await users.create(payload);
    return res.json(success({ message: "data berhasil ditambahkan", data }));
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.update = async ({ body }, res) => {
  try {
    const payload = {
      name: body.name,
      address: body.address,
      gender: body.gender,
      phone: body.phone,
    };
    const where = {
      id: body.id,
    };
    const data = await users.update(payload, { where });
    return res.json(
      success({
        message: "data berhasil diperbarui",
        data: { ...where, ...payload },
      })
    );
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.del = async ({ body }, res) => {
  try {
    const where = {
      id: body.id,
    };
    console.log(where);
    const data = await users.destroy({ where });
    if (data)
      return res.json(
        success({
          message: "data berhasil dihapus",
          data,
        })
      );
    else throw "User tidak ditemukan";
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};
