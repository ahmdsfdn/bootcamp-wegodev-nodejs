const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/count-users", userController.countUsers);

//CRUD Standard
/**
 * @swagger
 * /user?limit=2&pages=1:
 *  get:
 *    description: get data user paginasi
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *        type: integer
 *        description: data yang ditampilkan
 *        required: true
 *      - in: query
 *        name: pages
 *        schema:
 *        type: integer
 *        required: true
 *        description: halaman
 *    tags:
 *      - User
 *    responses:
 *      200:
 *        description: Data users retrieved successfully
 *      500:
 *        description: Data users failed to retrieved
 */
router.get("/", userController.index); //index
/**
 * @swagger
 * /user/{id}:
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
 *        description: Data users retrieved successfully
 *      500:
 *        description: Data users failed to retrieved
 */
router.get("/:id", userController.show); //detail user
/**
 * @swagger
 * /user/:
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
 *        description: Data users retrieved successfully
 *      500:
 *        description: Data users failed to retrieved
 */
router.post("/", userController.store); //store
/**
 * @swagger
 * /user/{id}:
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
 *        description: Update user success
 *      500:
 *        description: Update user failed
 */
router.put("/:id", userController.update); //update
/**
 * @swagger
 * /user/{id}:
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
 *        description: Delete user success
 *      500:
 *        description: Delete user failed
 */
router.delete("/:id", userController.delete); //delete

module.exports = router;
