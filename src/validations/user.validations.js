const { body } = require("express-validator");
const { Users } = require("../models");
const { Op } = require("sequelize");

const uniqueEmailValidation = (isUpdate = false) => {
  return async (value, { req }) => {
    const userId = req.params.id;
    const whereClause = isUpdate
      ? { email: value, id: { [Op.ne]: userId } }
      : { email: value };

    const user = await Users.findOne({ where: whereClause });
    if (user) {
      throw new Error("E-mail already in use");
    }
  };
};

const userDataValidateChainMethod = [
  body("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Full name is required")
    .isString()
    .withMessage("Full name should be string"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
  body("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Provide valid email")
    .custom(uniqueEmailValidation()),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage("Status name is required")
    .isString()
    .withMessage("Status should be string")
    .isIn(["Active", "Suspend"])
    .withMessage("Status value is invalid"),
  body("role")
    .exists({ checkFalsy: true })
    .withMessage("Role name is required")
    .isString()
    .withMessage("Role should be string")
    .isIn(["Super Admin", "Creator"])
    .withMessage("Role value is invalid"),
];

const updateUserDataValidateChainMethod = [
  body("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Full name is required")
    .isString()
    .withMessage("Full name should be string"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
  body("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Provide valid email")
    .custom(uniqueEmailValidation(true)),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage("Status name is required")
    .isString()
    .withMessage("Status should be string")
    .isIn(["Active", "Suspend"])
    .withMessage("Status value is invalid"),
  body("role")
    .exists({ checkFalsy: true })
    .withMessage("Role name is required")
    .isString()
    .withMessage("Role should be string")
    .isIn(["Super Admin", "Creator"])
    .withMessage("Role value is invalid"),
];

module.exports = {
  userDataValidateChainMethod,
  updateUserDataValidateChainMethod,
};
