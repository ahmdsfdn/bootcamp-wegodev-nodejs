"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Files, {
        foreignKey: "avatar",
        as: "Avatar",
      });
    }
  }
  Users.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      fullName: DataTypes.STRING,
      role: DataTypes.ENUM({
        values: ["Super Admin", "Creator"],
      }),
      status: DataTypes.ENUM({
        values: ["Active", "Suspend"],
      }),
      avatar: DataTypes.UUID,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Users",
      paranoid: true,
    }
  );

  return Users;
};
