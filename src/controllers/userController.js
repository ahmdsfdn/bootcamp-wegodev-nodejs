// const conn = require("../config/db.js");

const { Users } = require("../models");
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

      const results = await Users.findAll({
        attributes: { exclude: ["password"] },
      });

      res.json({
        message: "Data users retrieved successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
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

      return res.json({
        message: "Data user retrieved successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
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
        results,
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
        results,
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