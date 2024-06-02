const express = require("express");
const router = express.Router();

const authController = require("../../controllers/authController");
const userController = require("../../controllers/userController");
const {
  userDataValidateChainMethod,
} = require("../../validations/user.validations");
/**
 * @swagger
 * /v1/auth/register/:
 *  post:
 *    description: Register User
 *    tags:
 *      - Auth
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               fullName:
 *                 type: string
 *                 description: Full Name User
 *               email:
 *                 type: string
 *                 description: Email User
 *               password:
 *                 type: string
 *                 description: Password User
 *               role:
 *                 type: string
 *                 description: Role User
 *               avatar:
 *                 type: string
 *                 description: Avatar User
 *               status:
 *                 type: string
 *                 description: Status User
 *    responses:
 *      200:
 *        description: Data berhasil ditambah
 *      500:
 *        description: Data gagal ditambah
 */
router.post("/register", userDataValidateChainMethod, userController.store); //register

/**
 * @swagger
 * /v1/auth/login/:
 *  post:
 *    description: Untuk User melakukan login
 *    tags:
 *      - Auth
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               email:
 *                 type: string
 *                 description: Email User
 *               password:
 *                 type: string
 *                 description: Password User
 *    responses:
 *      200:
 *        description: Berhasil Login
 *      500:
 *        description: Gagal Login
 */
router.post("/login", authController.login); //login
/**
 * @swagger
 * /v1/auth/refresh-token/:
 *  post:
 *    description: Untuk User melakukan login
 *    tags:
 *      - Auth
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh Token
 *    responses:
 *      200:
 *        description: Refresh token success
 *      500:
 *        description: Refresh token failed
 */
router.post("/refresh-token", authController.refreshToken); //TUGAS - BIKIN SWAGGER UNTUK ENDPONT REFRESH TOKEN

module.exports = router;
