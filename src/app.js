//es 6
// import { show } from "./controllers/userController";

const express = require("express");
const globalMiddleware = require("./middlewares/globalMiddleware");
const env = require("dotenv").config().parsed;
const swagger = require("./routers/swagger");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Image From Public
app.use(express.static(path.join(__dirname, "../")));

// sanity check
// app.use(globalMiddleware());

// ROUTE SWAGGER
if (env.NODE_ENV === "development") {
  app.use("/api-docs", swagger);
}

const router = require("./routers/router");
app.use("/", router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
