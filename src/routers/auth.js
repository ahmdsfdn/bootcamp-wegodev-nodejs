const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/**
 * @swagger
 * /auth/register/:
 *  post:
 *    description: Untuk User melakukan pendaftaran
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               name:
 *                 type: string
 *                 description: Nama User
 *               email:
 *                 type: string
 *                 description: Email User
 *               password:
 *                 type: string
 *                 description: Password User
 *               role:
 *                 type: string
 *                 description: Role User
 *    responses:
 *      200:
 *        description: Berhasil Register
 *      500:
 *        description: Gagal Register
 */
router.post("/register", authController.register); //register

/**
 * @swagger
 * /auth/login/:
 *  post:
 *    description: Untuk User melakukan login
 *    security:
 *      - bearerAuth: []
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

router.post("/refresh-token", authController.refreshToken); //TUGAS - BIKIN SWAGGER UNTUK ENDPONT REFRESH TOKEN

module.exports = router;
