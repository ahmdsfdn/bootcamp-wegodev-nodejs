//es 6
// import { show } from "./controllers/userController";

const express = require("express");
const globalMiddleware = require("./middlewares/globalMiddleware");
const env = require("dotenv").config().parsed;
// const swagger = require("./routers/swagger");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sanity check
app.use(globalMiddleware());

const router = require("./routers/router");
app.use("/", router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
