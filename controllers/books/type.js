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
