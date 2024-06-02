const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");
const {
  userDataValidateChainMethod,
  updateUserDataValidateChainMethod,
} = require("../../validations/user.validations");
const { pagingValidation } = require("../../validations/global.validation.js");
const superAdminOnly = require("../../middlewares/superAdminOnly.js");
//CRUD Standard
/**
 * @swagger
 * /v1/user?pageSize=3&page=1&fullName=:
 *  get:
 *    description: get data user paginasi
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: pageSize
 *        schema:
 *        type: integer
 *        description: data yang ditampilkan
 *        required: true
 *      - in: query
 *        name: page
 *        schema:
 *        type: integer
 *        required: true
 *        description: halaman
 *      - in: query
 *        name: fullName
 *        schema:
 *        type: string
 *        description: filter nama
 *    tags:
 *      - User
 *    responses:
 *      200:
 *        description: Data berhasil diterima
 *      500:
 *        description: Data gagal diterima
 */
router.get("/", superAdminOnly(), pagingValidation, userController.index); //index
/**
 * @swagger
 * /v1/user/{id}:
 *  get:
 *    description: get data user by id
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        description: user id
 *        required: true
 *    tags:
 *      - User
 *    responses:
 *      200:
 *        description: Data berhasil diterima
 *      500:
 *        description: Data gagal diterima
 */
router.get("/:id", userController.show); //detail user
/**
 * @swagger
 * /v1/user/:
 *  post:
 *    description: Create User
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - User
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               fullName:
 *                 type: string
 *                 description: Full Name User
 *                 required: true
 *               email:
 *                 type: string
 *                 description: Email User
 *                 required: true
 *               password:
 *                 type: string
 *                 description: Password User
 *                 required: true
 *               role:
 *                 type: string
 *                 description: Role User
 *                 required: true
 *               status:
 *                 type: string
 *                 description: Status User
 *                 required: true
 *               avatar:
 *                 type: string
 *                 description: Avatar User
 *    responses:
 *      200:
 *        description: Data berhasil ditambah
 *      500:
 *        description: Data gagal ditambah
 */
router.post(
  "/",
  superAdminOnly(),
  userDataValidateChainMethod,
  userController.store
); //store
/**
 * @swagger
 * /v1/user/{id}:
 *  put:
 *    description: Update User
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - User
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        description: user id
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               fullName:
 *                 type: string
 *                 description: Full Name User
 *                 required: true
 *               email:
 *                 type: string
 *                 description: Email User
 *                 required: true
 *               password:
 *                 type: string
 *                 description: Password User
 *                 required: true
 *               role:
 *                 type: string
 *                 description: Role User
 *                 required: true
 *               status:
 *                 type: string
 *                 description: Status User
 *                 required: true
 *               avatar:
 *                 type: string
 *                 description: Avatar User
 *    responses:
 *      200:
 *        description: Data berhasil diperbaharui
 *      500:
 *        description: Data gagal diperbaharui
 */
router.put(
  "/:id",
  superAdminOnly(),
  updateUserDataValidateChainMethod,
  userController.update
); //update
/**
 * @swagger
 * /v1/user/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    description: Delete User
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        description: user id
 *        required: true
 *    tags:
 *      - User
 *    responses:
 *      200:
 *        description: Data berhasil dihapus
 *      500:
 *        description: Data gagal dihapus
 */
router.delete("/:id", superAdminOnly(), userController.delete); //delete

module.exports = router;
