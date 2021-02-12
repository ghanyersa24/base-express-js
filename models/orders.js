"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, orders, books }) {
      // define association here
      orders.belongsTo(users, {
        foreignKey: "users_id",
      });
      orders.belongsTo(books, {
        foreignKey: "books_id",
      });
    }
  }
  orders.init(
    {
      users_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      books_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "books",
          key: "id",
        },
      },
      qty: {
        type: DataTypes.INTEGER,
      },
      order_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      modelName: "orders",
    }
  );
  return orders;
};
