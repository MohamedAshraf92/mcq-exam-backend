const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const questionRoutes = require("./routes/question");

const Question = require("./models/question");
const questionsData = fs.readFileSync("./questions.json");
const questions = JSON.parse(questionsData);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/questions", questionRoutes);

mongoose
  .connect("mongodb://localhost:27017/MCQExam", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(8080);
    console.log(`Server running on port 8080`);
  })
  .catch((err) => console.log(err));

// mongoose.connection.db
//   .listCollections({ name: "questions" })
//   .next((err, collinfo) => {
//     if (collinfo) {
//       // The collection exists
//       Question.collection.drop();
//     }
//   });

Question.collection.drop();

Question.insertMany(questions)
  .then(() => {
    console.log("Questions are inserted");
  })
  .catch(() => console.log("Couldn't insert Questions"));
