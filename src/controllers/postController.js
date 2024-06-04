const { Posts, Categories, Files } = require("../models/index.js");
const { getPaginate, textToSlug } = require("../helper/helper.js");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const ValidationError = require("../exceptions/validation.exception.js");

class PostController {
  async index(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }

      const { page, pageSize, title, categoryIds } = req.query;

      let whereClause = {};
      // Filter
      if (title) {
        whereClause.title = { [Op.like]: `%${title}%` };
      }
      let whereCategories = {};
      if (categoryIds) {
        const categoriesArray = categoryIds.split(",").map(function (category) {
          return category.trim();
        });
        whereCategories.id = { [Op.in]: categoriesArray };
      }
      // End Filter

      const getData = await Posts.findAndCountAll({
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
        include: [
          {
            model: Categories,
            as: "Categories",
          },
          {
            model: Categories,
            as: "categoriesFilter",
            where: whereCategories,
            attributes: [],
          },
          "Thumbnail",
        ],
      });

      const { data, count, currentPage, totalPages } = await getPaginate(
        getData,
        page,
        pageSize
      );

      res.json({
        code: 200,
        message: `${count} data sudah diterima`,
        count,
        currentPage,
        totalPages,
        data,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({
          code: 400,
          message: "Silahkan cek kembali data anda",
          errors: err.errors.errors,
          data: [],
        });
      }
      res.status(500).json({
        code: 500,
        message: err.message,
        data: [],
      });
    }
  }

  async show(req, res) {
    try {
      const results = await Posts.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!results) {
        throw new Error("Data not found");
      }

      return res.json({
        code: 200,
        message: "Data sudah diterima",
        data: results,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  }

  async showBySlug(req, res) {
    try {
      const results = await Posts.findOne({
        where: {
          slug: req.params.slug,
        },
      });

      if (!results) {
        throw new Error("Data not found");
      }

      return res.json({
        code: 200,
        message: "Data sudah diterima",
        data: results,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  }

  async store(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }

      const posts = await Posts.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        slug: textToSlug(req.body.title.toString()),
        thumbnail: req.body.thumbnail,
      });

      const categories = await Categories.findAll({
        where: {
          id: { [Op.in]: req.body.categoryId },
        },
      });

      await posts.addCategories(categories);

      res.status(201).json({
        code: 201,
        message: "Data berhasil dibuat",
        data: posts,
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({
          code: 400,
          message: "Silahkan cek kembali data anda",
          errors: err.errors.errors,
          data: [],
        });
      }
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }

      const posts = await Posts.findByPk(req.params.id);

      posts.title = req.body.title;
      posts.description = req.body.description;
      posts.status = req.body.status;
      posts.slug = textToSlug(req.body.title.toString());
      posts.thumbnail = req.body.thumbnail;
      await posts.save();

      const categories = await Categories.findAll({
        where: {
          id: { [Op.in]: req.body.categoryId },
        },
      });

      await posts.setCategories(categories);

      return res.status(200).json({
        code: 200,
        message: "Data berhasil diperbaharui",
        data: await Posts.findOne({
          where: {
            id: req.params.id,
          },
        }),
      });
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({
          code: 400,
          message: "Silahkan cek kembali data anda",
          errors: err.errors.errors,
          data: [],
        });
      }
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const post = await Posts.findByPk(req.params.id, {
        include: Categories,
      });

      await post.removeCategories(post.Categories);

      await post.destroy();

      return res.status(200).json({
        code: 200,
        message: `Data berhasil dihapus`,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  }
}

module.exports = new PostController();
