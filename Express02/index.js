const express = require("express");
const app = express();
const port = 3000;

const lineRoute = require("./routes/line.js");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use("/api", lineRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
