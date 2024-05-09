const express = require("express");
const router = express.Router();

const adminRouter = require("./admin");
const profileRouter = require("./profile");
const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");

router.use("/admins", [auth(), adminOnly()], adminRouter);
router.use("/profiles", profileRouter);

module.exports = router;