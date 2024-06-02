"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Posts.belongsToMany(models.Categories, {
        through: "PostCategories",
        foreignKey: "postId",
      });

      Posts.belongsToMany(models.Categories, {
        through: "PostCategories",
        foreignKey: "postId",
        as: "categoriesFilter",
      });

      Posts.belongsTo(models.Files, {
        foreignKey: "thumbnail",
        as: "Thumbnail",
      });
    }
  }
  Posts.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumbnail: DataTypes.UUID,
      status: DataTypes.ENUM({
        values: ["Draft", "Published"],
      }),
      slug: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Posts",
      paranoid: true,
    }
  );
  return Posts;
};
