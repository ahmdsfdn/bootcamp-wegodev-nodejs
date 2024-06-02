"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profiles.init(
    {
      userId: DataTypes.INTEGER,
      alamat: DataTypes.STRING,
      no_hp: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Profiles",
    }
  );
  return Profiles;
};
