const { Categories } = require("../models");
const { getPaginate } = require("../helper/helper.js");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const ValidationError = require("../exceptions/validation.exception.js");

class CategoryController {
  async index(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }

      const { page, pageSize, title } = req.query;

      let whereClause = {};
      // Filter
      if (title) {
        whereClause.title = { [Op.like]: `%${title}%` };
      }
      // End Filter

      const getData = await Categories.findAndCountAll({
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
        where: whereClause,
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
      const results = await Categories.findOne({
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

  async store(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }

      const data = await Categories.create({
        title: req.body.title,
      });

      res.status(201).json({
        code: 201,
        message: "Data berhasil dibuat",
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
      });
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }

      await Categories.update(
        {
          title: req.body.title,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        code: 200,
        message: "Data berhasil diperbaharui",
        data: await Categories.findOne({
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
      const results = await Categories.destroy({
        where: {
          id: req.params.id,
        },
      });

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

module.exports = new CategoryController();
