const express = require("express");
const router = express.Router();
const env = require("dotenv").config().parsed;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tugas Aakhir Bootcamp Batch 4 - API v1",
      description: "API Documentation for Tugas Akhir Bootcamp Batch 4",
      contact: {
        name: "Ahmad Saifudin S",
      },
      servers: [`http://localhost:${env.PORT}`],
    },
  },
  apis: ["./src/routers/v1/*.js", "./src/routers/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
swaggerSpec.components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
