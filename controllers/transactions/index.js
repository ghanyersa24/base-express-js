const { success, failed } = require("../../config/response");
const { orders, users, books, type_books, sequelize } = require("../../models");

exports.create = async (req, res) => {
  const order = req.body.orders;
  const payload = order.map((order) => ({
    users_id: order.users_id,
    books_id: order.books_id,
    qty: order.qty,
    
  }));
  try {
    const data = await orders.bulkCreate(payload);
    return res.json(success({ message: "data berhasil ditambahkan", data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};

exports.get = async (req, res) => {
  try {
    const data = await users.findAll({
      attributes: ["name", "phone"],
      group: ["id", "orders.books_id"],
      order: [
        "name",
        [sequelize.fn("sum", sequelize.col("orders.qty")), "DESC"],
      ],
      include: [
        {
          model: orders,
          attributes: [
            [sequelize.fn("sum", sequelize.col("orders.qty")), "qty"],
          ],
          include: {
            model: books,
            attributes: ["name"],
            include: { model: type_books, attributes: ["name"] },
          },
        },
      ],
    });
    return res.json(success({ message: "data berhasil ditemukan", data }));
  } catch (error) {
    return res.json(failed({ message: "ERROR SYSTEM", data: error }));
  }
};
