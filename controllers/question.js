const Joi = require("joi");

const Question = require("../models/question");

exports.getQuestions = async (req, res, next) => {
  try {
    const allQuestions = await Question.find();

    const shuffledQuestions = await allQuestions
      .sort(() => Math.random() - 0.5)
      .splice(0, 5);

    const finalQuestions = await shuffledQuestions.map((q) => {
      return { ...q._doc, answers: q.answers.sort(() => Math.random() - 0.5) };
    });

    res.status(200).json(finalQuestions);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.checkAnswers = async (req, res, next) => {
  try {
    const answers = req.body.answers;

    let score = 0;

    const getScore = answers.map(async (el) => {
      const studentAnswer = el.answer;
      const question = el.question;
      const questionSource = await Question.findById(question);
      const correctAnswer = questionSource.answers.find((e) => e.right);
      correctAnswer.id.toString() === studentAnswer
        ? (score = score + 1)
        : console.log("wrong");
    });
    await Promise.all(getScore);
    res.status(200).json({ score });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
