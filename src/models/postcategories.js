"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostCategories.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      postId: DataTypes.UUID,
      categoryId: DataTypes.UUID,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PostCategories",
      paranoid: true,
    }
  );
  return PostCategories;
};
