const express = require("express");
const router = express.Router();

const PostController = require("../../controllers/postController.js");
const { pagingValidation } = require("../../validations/global.validation.js");
const { postValidation } = require("../../validations/post.validation.js");

//CRUD Standard
/**
 * @swagger
 * /v1/post?pageSize=3&page=1&title=&categoryIds=:
 *  get:
 *    description: get data post paginasi
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
 *      - in: query
 *        name: categoryIds
 *        schema:
 *        type: string
 *        description: filter category. ex = categoryId1,categoryId2,categoryId3
 *    tags:
 *      - Post
 *    responses:
 *      200:
 *        description: Data berhasil diterima
 *      500:
 *        description: Data gagal diterima
 */
router.get("/", pagingValidation, PostController.index); //index
/**
 * @swagger
 * /v1/post/{id}:
 *  get:
 *    description: get data post by id
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        description: postId
 *        required: true
 *    tags:
 *      - Post
 *    responses:
 *      200:
 *        description: Data berhasil diterima
 *      500:
 *        description: Data gagal diterima
 */
router.get("/:id", PostController.show); //detail
/**
 * @swagger
 * /v1/post/get-by-slug/{slug}:
 *  get:
 *    description: get data post by slug
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *        type: string
 *        description: slug
 *        required: true
 *    tags:
 *      - Post
 *    responses:
 *      200:
 *        description: Data berhasil diterima
 *      500:
 *        description: Data gagal diterima
 */
router.get("/get-by-slug/:slug", PostController.showBySlug); //detail
/**
 * @swagger
 * /v1/post/:
 *  post:
 *    description: Create Post
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Post
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               title:
 *                 type: string
 *                 description: Title post
 *                 required: true
 *               description:
 *                 type: string
 *                 description: description post
 *                 required: true
 *               categoryId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: category ids
 *                 required: true
 *               status:
 *                 type: string
 *                 description: Status post
 *                 required: true
 *               thumbnail:
 *                 type: string
 *                 description: thumbnail post
 *    responses:
 *      200:
 *        description: Data berhasil ditambah
 *      500:
 *        description: Data gagal ditambah
 */
router.post("/", postValidation, PostController.store); //store
/**
 * @swagger
 * /v1/post/{id}:
 *  put:
 *    description: Update Post
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Post
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        description: post id
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *               title:
 *                 type: string
 *                 description: Title post
 *               description:
 *                 type: string
 *                 description: description post
 *               categoryId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: category ids
 *               status:
 *                 type: string
 *                 description: Status post
 *               thumbnail:
 *                 type: string
 *                 description: thumbnail post
 *    responses:
 *      200:
 *        description: Data berhasil diperbaharui
 *      500:
 *        description: Data gagal diperbaharui
 */
router.put("/:id", postValidation, PostController.update); //update
/**
 * @swagger
 * /v1/post/{id}:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    description: Delete Post
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *        type: integer
 *        description: post id
 *        required: true
 *    tags:
 *      - Post
 *    responses:
 *      200:
 *        description: Data berhasil dihapus
 *      500:
 *        description: Data gagal dihapus
 */
router.delete("/:id", PostController.delete); //delete

module.exports = router;
