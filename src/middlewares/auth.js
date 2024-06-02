const jwt = require("jsonwebtoken");
const env = require("dotenv").config().parsed;
const { Users } = require("../models");

function auth(req, res, next) {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw new Error("Token tidak tersedia!");
      }

      //token
      const token = req.headers.authorization.split(" ")[1];

      // Verifikasi
      const verified = jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET);

      if (!verified) {
        throw new Error("Token tidak valid!");
      }

      const user = await Users.findOne({
        where: {
          id: verified.id,
        },
      });

      req.user = { id: user.id, role: user.role };

      next();
    } catch (error) {
      let statusCode = 500;

      if (error.message == "jwt expired") {
        statusCode = 401;
      }
      res.status(statusCode).json({
        message: error.message,
      });
    }
  };
}

module.exports = auth;
