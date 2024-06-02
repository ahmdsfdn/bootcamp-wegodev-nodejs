const { query } = require("express-validator");

const pagingValidation = [
  query("pageSize").exists().withMessage("pageSize is required"),
  query("page").exists().withMessage("Page is required"),
];

module.exports = { pagingValidation };
