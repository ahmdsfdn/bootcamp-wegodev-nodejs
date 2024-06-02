"use strict";
const { Model } = require("sequelize");
const { PostCategories } = require("../models");

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Categories.belongsToMany(PostCategories, {
      //   through: "PostCategories",
      //   as: "CategoriesPost",
      //   foreignKey: "categoryId",
      // });
    }
  }
  Categories.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Categories",
      paranoid: true,
    }
  );
  return Categories;
};
