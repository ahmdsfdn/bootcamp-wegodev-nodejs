const express = require("express");
const router = express.Router();

//import controller
const { show } = require("../controllers/userController");

//get, post, put/patch, delete
router.get("/", show); //read all
router.get("/", show); //menampilkan 1 data
router.post("/", show); //create
router.put("/", show); //update
router.delete("/", show); //delete

module.exports = router;