"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class type_books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ type_books, books }) {
      // define association here
      type_books.hasMany(books, {
        foreignKey: "type_books_id",
      });
    }
  }
  type_books.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "type_books",
    }
  );
  return type_books;
};
