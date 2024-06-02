const { Users } = require("../models");
const { getPaginate } = require("../helper/helper.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const ValidationError = require("../exceptions/validation.exception.js");
const { Op, where } = require("sequelize");

class UserController {
  async index(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }

      const { page, pageSize, fullName } = req.query;

      let whereClause = {};
      // Filter
      if (fullName) {
        whereClause.fullName = { [Op.like]: `%${fullName}%` };
      }
      // End Filter

      const getData = await Users.findAndCountAll({
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
        where: whereClause,
        include: [{ association: "Avatar" }],
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
      const data = await Users.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ["password"] },
        include: [{ association: "Avatar" }],
      });

      if (!data) {
        throw new Error("Data not found");
      }

      return res.json({
        code: 200,
        message: "Data sudah diterima",
        data,
      });
    } catch (err) {
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  }

  async store(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }

      const newPassword = await bcrypt.hash(req.body.password, 10);

      const results = await Users.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: newPassword,
        role: req.body.role,
        status: req.body.status,
        avatar: req.body.avatar,
      });

      res.status(201).json({
        code: 201,
        message: "User created successfully",
        data: results,
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
        message: err,
      });
    }
  }

  async update(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw new ValidationError(errors);
      }

      const newPassword = await bcrypt.hash(req.body.password, 10);

      const results = await Users.update(
        {
          fullName: req.body.fullName,
          email: req.body.email,
          password: newPassword,
          role: req.body.role,
          status: req.body.status,
          avatar: req.body.avatar,
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
        data: await Users.findOne({
          where: {
            id: req.params.id,
          },
          attributes: { exclude: ["password"] },
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
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const results = await Users.destroy({
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
        message: err,
      });
    }
  }
}
module.exports = new UserController();
