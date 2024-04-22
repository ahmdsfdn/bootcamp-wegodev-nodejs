const express = require("express");
const app = express();
const port = 3000;

app.get("/articles", (req, res) => {
  res.json({
    title: "Ini adalah article",
    description: "Ini adalah description",
  });
});

app.post("/articles", (req, res) => {
  res.json({
    title: "Ini adalah article",
    description: "Ini adalah description",
  });
});

app.put("/articles", (req, res) => {
  res.json({
    title: "Ini adalah article",
    description: "Ini adalah description",
  });
});

app.delete("/articles", (req, res) => {
  res.json({
    title: "Ini adalah article",
    description: "Ini adalah description",
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
