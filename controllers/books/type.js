const { success, failed } = require("../../config/response");
const { type_books } = require("../../models");

exports.get = async ({ params }, res) => {
  const where = {};
  if (params.id) where.id = params.id;
  try {
    const listTypeBooks = await type_books.findAll({ where });
    return res.json(
      success({
        message: "data tipe buku berhasil diterima",
        data: listTypeBooks,
      })
    );
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};
exports.create = async ({ body }, res) => {
  try {
    const [typeBooks, created] = await type_books.findOrCreate({
      where: { name: body.name },
    });
    if (created)
      return res.json(success({ message: "berhasil menambahkan tipe buku" }));
    return res.json(failed({ message: "data tipe buku sudah ada" }));
  } catch (error) {
    return res.json(failed({ message: "ERROR", data: error }));
  }
};

exports.update = async ({ body }, res) => {
  const payload = { name: body.name };
  try {
    const req = await type_books.update(payload, { where: { id: body.id } });
    return res.json(success({ message: "berhasil mengubah tipe buku" }));
  } catch (error) {
    return res.json(failed({ message: "ERROR", data: error }));
  }
};

exports.del = async ({ body }, res) => {
  try {
    const where = {
      id: body.id,
    };
    const data = await type_books.destroy({ where });
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
