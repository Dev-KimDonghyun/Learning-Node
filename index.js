import express from "express";
import mongoose from "mongoose";
import MONGOURI from "./mongoUri.js";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Node Express");
});

const mongoConnect = async() => {
  try {
    await mongoose.connect(MONGOURI);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log(err);
  }
}

mongoConnect();

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});