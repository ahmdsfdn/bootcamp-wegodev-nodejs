const express = require("express");
const router = express.Router();

const adminRouter = require("./admin");
const userRouter = require("./user");
const authRouter = require("./auth");

const auth = require("../middlewares/auth");
const adminOnly = require("../middlewares/adminOnly");

router.use("/admins", [auth(), adminOnly()], adminRouter);
router.use("/user", [auth()], userRouter);
router.use("/auth", authRouter);

module.exports = router;
