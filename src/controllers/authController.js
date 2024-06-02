const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config().parsed;

class AuthController {
  generateToken = async (payload) => {
    const accessToken = jwt.sign(payload, env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1000m",
    });

    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return { accessToken, refreshToken };
  };

  register = async (req, res) => {
    try {
      const user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.body.role,
      });

      if (!user) {
        throw new Error("Register failed");
      }

      const { accessToken, refreshToken } = await this.generateToken({
        id: user.id,
        // role: user.role,
      });

      res.status(200).json({
        code: 200,
        message: "Registered successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
        user,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: error.message,
      });
    }
  };

  login = async (req, res) => {
    try {
      const user = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        throw new Error("Email not found");
      }

      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validatePassword) {
        throw new Error("Password is wrong");
      }

      const { accessToken, refreshToken } = await this.generateToken({
        id: user.id,
      });

      res.json({
        code: 200,
        message: "login success",
        accessToken: accessToken,
        refreshToken: refreshToken,
        user,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: error.message,
      });
    }
  };

  refreshToken = async (req, res) => {
    try {
      const parRefreshToken = req.body.refreshToken;

      if (!parRefreshToken) {
        throw new Error("refresh token required");
      }

      //   verfif
      const user = jwt.verify(parRefreshToken, env.JWT_REFRESH_TOKEN_SECRET);

      const { accessToken, refreshToken } = await this.generateToken({
        id: user.id,
      });

      res.json({
        code: 200,
        message: "Refresh token success",
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: error.message,
      });
    }
  };
}

module.exports = new AuthController();
