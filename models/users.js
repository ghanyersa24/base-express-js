"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users, books, orders }) {
      // define association here
      // users.belongsToMany(books, {
      //   through: "orders",
      //   foreignKey: "users_id",
      // });
      users.hasMany(orders, {
        foreignKey: "users_id",
      });
    }
  }
  users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING(100) },
      password: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING(12) },
      gender: { type: DataTypes.STRING(10) },
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  return users;
};
