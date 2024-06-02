const express = require("express");
const router = express.Router();

const userRouter = require("./v1/user");
const authRouter = require("./v1/auth");
const postRouter = require("./v1/posts");
const categoryRouter = require("./v1/category");

const auth = require("../middlewares/auth");
const { uploadFile } = require("../controllers/uploadController");
const userController = require("../controllers/userController");

router.post("/v1/upload", auth(), uploadFile);
router.use("/v1/user", [auth()], userRouter);
router.use("/v1/post", [auth()], postRouter);
router.use("/v1/category", [auth()], categoryRouter);
router.use("/v1/auth", authRouter);
router.get("/v1/profile/:id", userController.show);

module.exports = router;

/**
 * @swagger
 * /v1/upload:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              document:
 *                type: string
 *                format: binary
 *    description: Upload a file.
 *    responses:
 *      '200':
 *        description: File uploaded successfully.
 *      '500':
 *        description: Failed to upload the file.
 */
