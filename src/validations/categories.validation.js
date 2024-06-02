const { body } = require("express-validator");
const { Categories } = require("../models/index");
const categoriesValidation = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be string"),
];

module.exports = { categoriesValidation };
