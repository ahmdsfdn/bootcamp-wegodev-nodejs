const { body } = require("express-validator");

const postValidation = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title is required")
    .isString()
    .withMessage("Title should be string"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required")
    .isString()
    .withMessage("Description should be string"),
  body("categoryId")
    .exists({ checkFalsy: true })
    .withMessage("Category is required"),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage("Status is required")
    .isString()
    .withMessage("Status should be string")
    .isIn(["Published", "Draft"])
    .withMessage("Status value is invalid"),
];

module.exports = {
  postValidation,
};
