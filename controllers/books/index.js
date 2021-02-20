const { success, failed } = require("../../config/response");
const {
  users,
  books,
  type_books,
  Sequelize,
  sequelize,
} = require("../../models");

exports.get = async (req, res) => {
  try {
    const data = await books.findAll({
      include: [type_books],
    });
    return res.json(success({ message: "data buku berhasil diterima", data }));
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.create = async ({ body }, res) => {
  try {
    const payload = {
      name: body.name,
      type_books_id: body.type_books_id,
    };
    const data = await books.create(payload);
    return res.json(success({ message: "data berhasil ditambahkan", data }));
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};

exports.update = async ({ body }, res) => {
  try {
    const payload = {
      name: body.name,
      type_books_id: body.type_books_id,
    };
    const where = {
      id: body.id,
    };
    const data = await books.update(payload, { where });
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
    const data = await books.destroy({ where });
    if (data)
      return res.json(
        success({
          message: "data berhasil dihapus",
          data,
        })
      );
    else throw "Buku tidak ditemukan";
  } catch (error) {
    return res.json(failed({ data: error }));
  }
};
