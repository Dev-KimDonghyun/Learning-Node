import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import User from "./models/userModel.js";

const app = express();
const port = 3000;

dotenv.config(); // env 사용 처리

const MONGOURI = process.env.MONGO_URI; // env 사용 처리

app.use(express.json());
// Express 앱에서 클라이언트가 보낸 JSON 데이터를 읽을 수 있게 해줌
// req.body를 사용할 수 있게 해주는 설정
// 기본적으로 Express는 클라이언트가 보내는 JSON 데이터를 자동으로 파싱해주지 않음
// 이 설정이 없다면 req.body가 undefined로 나옴
// req.body에는 클라이언트의 요청이 담겨 있음

app.get("/", (req, res) => {
  res.send("Hello Node Express");
});

const mongoConnect = async () => {
  try {
    await mongoose.connect(MONGOURI);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log(err);
  }
}; // MONGOURI를 통해 MongoDB에 연결하는 함수 정의

mongoConnect(); // 함수 실행

// POST
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    // 클라이언트가 보낸 req.body를 기반으로 User 인스턴스 생성
    const saved = await newUser.save();
    // 생성한 인스턴스를 MongoDB에 저장
    res.status(201).json(saved);
    // 저장된 사용자 정보를 클라이언트에 응답
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    // MongoDB에서 모든 사용자 문서를 조회
    res.json(users);
    // 조회된 사용자 목록을 클라이언트에 응답
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT
app.put("/users/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // URL의 id 값을 사용하여 해당 사용자 문서를 찾고 req.body의 내용으로 업데이트
    res.json(updated);
    // 수정된 사용자 정보를 클라이언트에 응답
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    // URL의 id 값을 사용하여 해당 사용자 문서를 삭제
    res.json({ message: "User deleted" });
    // 삭제 성공 메시지를 클라이언트에 응답
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
