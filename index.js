const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Node Express");
});

app.get("/get", (req, res) => {
  res.send("GET은 서버에게 정보를 달라고 요청함.");
});

app.post("/post", (req, res) => {
  res.send("POST는 서버에게 새로운 정보를 생성하라고 요청함.");
});

app.put("/put", (req, res) => {
  res.send("PUT은 서버에게 데이터를 통째로 바꾸라고 요청함.");
});

app.delete("/delete", (req, res) => {
  res.send("DELETE는 서버에게 데이터를 지우라고 요청함.");
});

app.listen(port, () => {
  console.log(`Server is Running on port${port}`);
});
