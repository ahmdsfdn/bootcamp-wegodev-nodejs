const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/count-users", userController.countUsers);

//CRUD Standard
router.get("/", userController.index); //index
router.get("/:id", userController.show); //detail user
router.post("/", userController.store); //store
router.put("/:id", userController.update); //update
router.delete("/:id", userController.delete); //delete

module.exports = router;
