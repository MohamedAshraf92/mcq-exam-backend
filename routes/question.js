const express = require("express");

const { getQuestions } = require("../controllers/question");
const { checkAnswers } = require("../controllers/question");

const router = express.Router();

router.get("/", getQuestions);

router.post("/", checkAnswers);

module.exports = router;
