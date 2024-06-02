const express = require("express");
const router = express.Router();

const CategoryController = require("../../controllers/categoryController.js");
const { pagingValidation } = require("../../validations/global.validation.js");
const {
  categoriesValidation,
} = require("../../validations/categories.validation.js");
const categoryController = require("../../controllers/categoryController.js");

//CRUD Standard
/**
 * @swagger
 * /v1/category?pageSize=3&page=1&title=:
 *  get:
 *    description: get data category paginasi
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
 *        name: title
 *        schema:
 *        type: string
 *        description: filter title
 *    tags:
 *      - Category
 *    responses:
 *      200:
 *        description: Data berhasil diterima
 *      500:
 *        description: Data gagal diterima
 */
router.get("/", pagingValidation, CategoryController.index); //index
/**
 * @swagger
 * /v1/category/{id}:
 *  get:
 *    description: get data category by id
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        description: categoryId
 *        required: true
 *    tags:
 *      - Category
 *    responses:
 *      200:
 *        description: Data berhasil diterima
 *      500:
 *        description: Data gagal diterima
 */
router.get("/:id", CategoryController.show); //detail
/**
 * @swagger
 * /v1/category/:
 *  post:
 *    description: Create Category
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Category
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               title:
 *                 type: string
 *                 description: Title category
 *                 required: true
 *    responses:
 *      200:
 *        description: Data berhasil ditambah
 *      500:
 *        description: Data gagal ditambah
 */
router.post("/", categoriesValidation, CategoryController.store); //store
/**
 * @swagger
 * /v1/category/{id}:
 *  put:
 *    description: Update Category
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Category
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        description: category id
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               title:
 *                 type: string
 *                 description: Title category
 *                 required: true
 *    responses:
 *      200:
 *        description: Data berhasil ditambah
 *      500:
 *        description: Data gagal ditambah
 */
router.put("/:id", categoriesValidation, CategoryController.update); //update
/**
 * @swagger
 * /v1/category/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    description: Delete Category
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        description: user id
 *        required: true
 *    tags:
 *      - Category
 *    responses:
 *      200:
 *        description: Data berhasil dihapus
 *      500:
 *        description: Data gagal dihapus
 */
router.delete("/:id", categoryController.delete); //delete

module.exports = router;
