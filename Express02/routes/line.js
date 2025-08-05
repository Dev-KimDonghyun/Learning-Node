const express = require("express");
const router = express.Router();
const line = require("../data/line0.json");

router.get("/lineInfo", (req, res) => {
    res.json(line);
})

module.exports = router;