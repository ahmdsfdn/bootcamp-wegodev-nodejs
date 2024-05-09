const express = require("express");
const router = express.Router();

// const { index, store } = require("../controllers/adminController");
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");

//admins

router.get("/", adminController.index); //read all
router.get("/:id", adminController.show); //menampilkan 1 data, ex: /admins/1
router.post("/", adminController.store); //read all
// router.update("/", adminController.delete); //menampilkan 1 data, ex: /admins/1
router.delete("/:id", adminController.delete); //delete 1 data, ex: /admins/1
router.post("/uploads", adminController.upload); //upload file

module.exports = router;