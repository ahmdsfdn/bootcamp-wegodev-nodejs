// const conn = require("../config/db.js");

const { Users, Profiles } = require("../models");
const { getPaginate } = require("../helper/helper.js");
const bcrypt = require("bcrypt");

class UserController {
  async index(req, res) {
    try {
      /*
        SELECT m.id, u.id as userId, c.id AS courseId, u.name, c.course FROM users u 
        JOIN memberships m ON u.id=m.userId JOIN courses c ON c.id=m.coursesId
        JOIN 4 TABLES DIATAS BISA DIUBAH MENJADI 1 QUERY TABLE VIEW
      */
      // const [results, fields] = await conn.query("SELECT * FROM usermember");

      // GET ALL
      // const results = await Users.findAll({
      //   attributes: { exclude: ["password"] },
      // });

      const { pages, limit } = req.query;

      if (!pages || pages == 0 || !limit || limit == 0) {
        return res.status(400).json({
          message: "Parameter is invalid,please check your parameter",
        });
      }

      const data = await Users.findAndCountAll({
        offset: (parseInt(pages) - 1) * parseInt(limit),
        limit: parseInt(limit),
        include: [{ association: "profile", attributes: ["no_hp", "alamat"] }],
      });

      res.json({
        message: "Data users retrieved successfully",
        result: getPaginate(data, pages, limit),
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async show(req, res) {
    try {
      // const [results, fields] = await conn.query(
      //   `SELECT * FROM users WHERE id = ${req.params.id}`
      // );

      const results = await Users.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ["password"] },
      });

      if (!results) {
        throw new Error("Data not found");
      }

      return res.json({
        message: "Data user retrieved successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async store(req, res) {
    try {
      // const result = await conn.query(
      //   `INSERT INTO users (name, gender, email) VALUES ('${req.body.name}', '${req.body.gender}', '${req.body.email}')`
      // );

      const newPassword = await bcrypt.hash(req.body.password, 10);

      const results = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
        role: req.body.role,
      });

      res.status(201).json({
        message: "User created successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async update(req, res) {
    try {
      // const [results, fields] = await conn.query(
      //   `UPDATE users
      //   SET name = '${req.body.name}', gender = '${req.body.gender}', email = '${req.body.email}'
      //   WHERE id = ${req.params.id}`
      // );

      const results = await Users.update(
        {
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        message: "User updated successfully",
        results: await Users.findOne({
          where: {
            id: req.params.id,
          },
          attributes: { exclude: ["password"] },
        }),
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async delete(req, res) {
    try {
      // const [results, fields] = await conn.query(
      //   `SELECT * FROM users WHERE id =  ${req.params.id}`
      // );

      //query delete
      // await conn.query(`DELETE FROM users WHERE id = ${req.params.id}`);

      const results = await Users.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        message: `User deleted successfully`,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  async countUsers(req, res) {
    try {
      const { count, rows } = await Users.findAndCountAll({
        attributes: { exclude: ["password"] },
      });

      res.json({
        message: "Data users retrieved successfully",
        result: {
          count,
          rows,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

// function show(req, res) {
//   res.json({
//     nama: "John",
//     pesan: "Selamat bergabung John!",
//   });
// }

// module.exports = { store };
module.exports = new UserController();
